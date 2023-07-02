<script lang="ts">
	import type { Attributes } from '$lib/characters';
	import { getTracker } from '$lib/stores/encounter';

	export let encounterID: string;
	const calcHP = (attr: Attributes) => {
		return attr.bonushp + attr.classhp + attr.ancestryhp + attr.bonushpPerLevel;
	};

	const encounter = getTracker(encounterID);
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<th>Name</th>
			<th>Hit Points</th>
			<th>Initiative</th>
			<th>Conditions</th>
		</thead>
		<tbody>
			{#if $encounter.participants}
				{#each $encounter.participants as participant}
					<tr>
						<td>{participant.character.name}</td>
						<td>/{calcHP(participant.character.attributes)}</td>
						<td>{participant.initiative}</td>
						<td>{participant.conditions}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
