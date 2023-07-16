import { config } from '$lib/config';
import type { Encounter } from '$lib/encounters';
import { getInstance } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const encounter_id = params.encounter_id;

	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);

	//const encounter = await db.select(`encounters:${encounter_id}`);

	const encounterResult = await db.query<[Encounter[]]>(
		`select *, 
    (select 
        conditions,
        initiative,
        in as character
      from participant where out = $parent.id fetch character) as participants 
    from type::thing("encounters", $encounter_id)`,
		{ encounter_id: encounter_id }
	);

	console.log(encounterResult[0]?.result?.at(0));
	const encounter = encounterResult[0]?.result?.at(0);
	if (!encounter) {
		throw error(404, 'could not find the requested encounter');
	}
	return {
		encounter
	};
}) satisfies PageServerLoad;
