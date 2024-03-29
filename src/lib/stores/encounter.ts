import type { Encounter } from '$lib/encounters';
import { writable, type Writable } from 'svelte/store';

const storeMap: Record<string, Writable<Encounter>> = {};

const getTracker = (id: string) => {
	if (storeMap[id] === undefined) {
		storeMap[id] = writable<Encounter>();
		storeMap[id].subscribe((item) => {
			item.participants.sort((a, b) => a.initiative - b.initiative);
		});
	}
	return storeMap[id];
};

export { getTracker };
