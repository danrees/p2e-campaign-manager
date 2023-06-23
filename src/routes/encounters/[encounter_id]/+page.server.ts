import { config } from '$lib/config';
import type { Encounter } from '$lib/encounters';
import { getInstance } from '$lib/surreal';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const encounter_id = params.encounter_id;

	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);

	//const encounter = await db.select(`encounters:${encounter_id}`);

	const encounter = await db.query(
		`select *, (select <-participant, <-participant<-characters ) as participants from encounters:${encounter_id} fetch participants`,
		{ id: encounter_id }
	);

	return {
		encounter
	};
}) satisfies PageServerLoad;
