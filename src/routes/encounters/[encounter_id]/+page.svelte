<script lang="ts">
	import RunEncounter from '$lib/comonents/RunEncounter.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: encounter = data.encounter;
	$: console.log(encounter[0]);
</script>

<div>
	<h1>{encounter.name}</h1>
	<RunEncounter {encounter} />
</div>
