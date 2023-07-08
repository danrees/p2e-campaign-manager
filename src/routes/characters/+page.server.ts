import type { Character } from '$lib/characters';
import { config } from '$lib/config';
import { getInstance } from '$lib/surreal';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const db = await getInstance();
	const { database, namespace, user, pass } = config();
	await db.signin({ user, pass });
	await db.use(namespace, database);

	const characters: Character[] = await db.select('characters');

	return { characters };
}) satisfies PageServerLoad;
