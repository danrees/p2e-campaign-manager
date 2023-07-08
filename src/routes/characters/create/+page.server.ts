import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { getInstance } from '$lib/surreal';

const schema = z.object({
	text: z.string()
});

export const load = (async () => {
	const form = await superValidate(schema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	importCharacter: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			console.log('failed validation');
			return fail(400, { importForm: form });
		}
		const data = JSON.parse(form.data.text);
		const db = await getInstance();
		await db.signin({ user: 'root', pass: 'password' });
		await db.use('campaign_planner', 'pathfinder');
		const resp = await db.create(`characters`, data.build);
		console.log(resp);
		return { form };
	}
} satisfies Actions;
