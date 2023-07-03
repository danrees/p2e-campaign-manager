import { config } from '$lib/config';
import type { Encounter, Participant } from '$lib/encounters';
import { getInstance } from '$lib/surreal';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const encounter_id = params.encounter_id;

	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);

	//const encounter = await db.select(`encounters:${encounter_id}`);

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

	console.log(encounter[0]?.result?.at(0));

	return {
		encounter: encounter[0]?.result?.at(0)
	};
}) satisfies PageServerLoad;
