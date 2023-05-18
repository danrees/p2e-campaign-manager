<script lang="ts">
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, enhance, errors } = superForm(data.form, { dataType: 'json' });

	$: characters = data.characters;

	let toAdd: { id: string; name: string; initiative: number };

	const addParticipant = () => {
		if (toAdd && !$form.participants.includes(toAdd)) {
			const part = { ...toAdd, initiative: 0 };
			$form.participants = [...$form.participants, part];
		} else {
			toastStore.trigger({ message: 'Character with id already a participant' });
		}
	};
</script>

<h3>Encounter</h3>
<form method="post" action="?/create" use:enhance class="space-y-5 py-5">
	<div>
		<label class="label">
			<span>Name</span>
			<input
				type="text"
				name="encounter_name"
				id="encounter_name"
				class="input"
				data-invalid={$errors.name}
				bind:value={$form.name}
			/>
		</label>
	</div>
	{#each $form.participants as participant, i (participant.id)}
		<div class="grid grid-cols-2">
			<div>
				<label>
					<span>Character Name</span>
					<input type="text" class="input" bind:value={$form.participants[i].name} />
				</label>
			</div>
			<div>
				<label>
					<span>Initiative</span>
					<input type="number" class="input" bind:value={$form.participants[i].initiative} />
				</label>
			</div>
		</div>
	{/each}
	<button class="btn variant-ringed-primary" type="submit">Submit</button>
</form>
<hr class="!border-t-2" />
<div class="space-y-3 py-5">
	<h3>Add Character to encounter</h3>
	<select class="select" bind:value={toAdd}>
		{#each characters as character}
			<option value={character}>{character.name}</option>
		{/each}
	</select>
	<button
		class="btn variant-ringed-primary"
		on:click={() => {
			addParticipant();
		}}>Add</button
	>
</div>

<hr class="!border-t-2" />
<div class="space-y-3 py-5">
	<h3>Add Creature to encounter</h3>
	<input type="text" class="input" />
	<button
		class="btn variant-ringed-primary"
		on:click={() => {
			addParticipant();
		}}>Add</button
	>
</div>
