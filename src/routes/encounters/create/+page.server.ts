import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getInstance } from '$lib/surreal';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';
import { config } from '$lib/config';
import type { Character } from '$lib/characters';

const schema = z.object({
	name: z.string().nonempty(),
	participants: z
		.object({
			name: z.string(),
			initiative: z.number(),
			id: z.string(),
			currentHP: z.number()
		})
		.array()
		.nonempty()
});

export const load = (async () => {
	const form = await superValidate(schema);
	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);

	const characters: Character[] = await db.select('characters');
	return { form, characters };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('POST', form.data);
		const { database, namespace, pass, user } = config();
		const db = await getInstance();
		await db.signin({ user, pass });
		await db.use(namespace, database);
		// await db.create(`encounter:${}`)
		const resp: { name: string; id: string }[] = await db.create(`encounters`, {
			name: form.data.name
		});
		console.log(resp);
		for (const p of form.data.participants) {
			await db.query(`RELATE ${resp.at(0)?.id}->participant->${p.id} CONTENT {
				initiative: ${p.initiative},
				conditions: [],
        currentHP: ${p.currentHP},
			}`);
		}
		return { form };
	}
};
