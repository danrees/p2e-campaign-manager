<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: encounters = data.encounters;

	const splitID = (fullID: string) => {
		return fullID.split(':').at(1);
	};
</script>

<div>
	<h1>Encounters</h1>

	<ul>
		<li><a href="/encounters/create">Create</a></li>
	</ul>

	<ul>
		{#each encounters as enc}
			<li><a href={`/encounters/${splitID(enc.id)}/run`}>{enc.name}</a></li>
		{/each}
	</ul>
</div>
