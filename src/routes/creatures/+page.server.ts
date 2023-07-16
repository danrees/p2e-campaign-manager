import type { Creature } from '$lib/characters';
import { config } from '$lib/config';
import { prepareInstance } from '$lib/surreal';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const db = await prepareInstance(config());
	const creatures: Creature[] = await db.select('creatures');
	return { creatures };
}) satisfies PageServerLoad;
