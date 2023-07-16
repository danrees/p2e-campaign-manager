<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: creatures = data.creatues;
</script>

<h3>Creatures</h3>
<ul>
	{#each creatures as creature}
		<li><a href={`/creatures/${creature.id}`}>{creature.name}</a></li>
	{/each}
</ul>
