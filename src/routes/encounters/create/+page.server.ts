import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getInstance } from '$lib/surreal';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';
import type { Participant } from '$lib/tools';

const schema = z.object({
	name: z.string(),
	participants: z
		.object({
			name: z.string(),
			initiative: z.number(),
			id: z.string()
		})
		.array()
});

export const load = (async () => {
	const participants: Participant[] = [
		{
			name: 'Player 1',
			hitPoints: 20,
			id: '1',
			acTotal: { acTotal: 15 },
			initiative: 0,
			condition: ''
		},
		{
			name: 'Player 2',
			hitPoints: 20,
			id: '2',
			acTotal: { acTotal: 15 },
			initiative: 0,
			condition: ''
		}
	];
	const form = await superValidate({ name: 'test', participants: participants }, schema);
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form.data);

		// const db = await getInstance();
		// await db.use('pathfinder', 'campaign-manager');
		// await db.create(`encounter:${}`)
		return { form };
	}
};
