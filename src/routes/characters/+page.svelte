<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: characters = data.characters;
</script>

<div>
	<ul>
		{#each characters as character}
			<li><a href={`/characters/${character.id}`}>{character.name}</a></li>
		{/each}
	</ul>
</div>
