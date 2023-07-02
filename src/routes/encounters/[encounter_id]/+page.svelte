<script lang="ts">
	import RunEncounter from '$lib/comonents/RunEncounter.svelte';
	import type { PageData } from './$types';
	import type { Encounter } from '$lib/encounters';
	import { getTracker } from '$lib/stores/encounter';
	export let data: PageData;
	let encounter: Encounter;
	$: {
		encounter = data.encounter;
		let tracker = getTracker(encounter.id);
		tracker.update((enc) => {
			if (enc === undefined) {
				return encounter;
			}
			return enc;
		});
	}
</script>

<div>
	<h1>{encounter.name}</h1>
	<RunEncounter encounterID={encounter.id} />
</div>
