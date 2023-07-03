<script lang="ts">
	import { calcHP, type Attributes } from '$lib/characters';
	import { getTracker } from '$lib/stores/encounter';
	import Encounter from './Encounter.svelte';

	export let encounterID: string;

	const encounter = getTracker(encounterID);
	$: console.log($encounter);
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
						<td>{participant.currentHP}/{calcHP(participant.character)}</td>
						<td>{participant.initiative}</td>
						<td>{participant.conditions}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
