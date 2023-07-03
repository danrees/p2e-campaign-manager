import type { Character } from '$lib/characters';
import { schema } from '$lib/comonents/encounter';
import { config } from '$lib/config';
import { getInstance } from '$lib/surreal';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import type { Encounter } from '$lib/encounters';
import { fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);
	const encounter_id = params.encounter_id;

	const encounter = await db.query<[Encounter[]]>(
		`select *, 
    (select 
        conditions,
        initiative,
        in as character
      from participant where out = $parent.id fetch character) as participants 
    from type::thing("encounters", $encounter_id)`,
		{ encounter_id: encounter_id }
	);

	console.log(encounter?.at(0)?.result?.at(0));
	const enc = encounter?.at(0)?.result?.at(0);
	if (!enc) {
		const form = await superValidate(schema);
		return fail(500, { form });
	}
	const form = await superValidate(enc, schema);

	const characters: Character[] = await db.select('characters');
	return { form, characters };
}) satisfies PageServerLoad;

export const actions: Actions = {
	update: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		// console.log('POST', form.data);
		const { database, namespace, pass, user } = config();
		const db = await getInstance();
		await db.signin({ user, pass });
		await db.use(namespace, database);
		// await db.create(`encounter:${}`)
		// const resp: { name: string; id: string }[] = await db.create(`encounters`, {
		// 	name: form.data.name
		// });
		await db.change(`encounters:${form.data.id}`, { name: form.data.name });
		// console.log(resp);

		for (const p of form.data.participants) {
			// await db.query(`RELATE ${form.data.id}->participant->${p.id} CONTENT {
			// 	initiative: ${p.initiative},
			// 	conditions: [],
			//      currentHP: ${p.currentHP},
			// }`);
			if (p.remove) {
				db.delete(`participant:${p.id}`);
			} else {
				db.change(`participant:${p.id}`, {
					currentHP: p.currentHP,
					initiative: p.initiative
				});
			}
		}
		return { form };
	}
};
