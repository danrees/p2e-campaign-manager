<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms/client';
	import { calcHP, type Character } from '$lib/characters';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { AnyZodObject } from 'zod';

	export let dataForm: SuperForm<AnyZodObject>;
	export let availableCharacters: Character[];
	export let action: string;

	let toAdd: Character;

	const addParticipant = () => {
		if (toAdd && !$form.participants.includes(toAdd as AddableCharacter)) {
			const part = { ...toAdd, initiative: 0, currentHP: calcHP(toAdd) };
			$form.participants = [...$form.participants, part];
		} else {
			toastStore.trigger({ message: 'Character with id already a participant' });
		}
	};

	const { form, enhance, errors } = dataForm;

	$: characters = availableCharacters;

	type FormCharacter = { name: string; id: string; initiative: number; currentHP: number };
	type AddableCharacter = FormCharacter & Character;
</script>

<form method="post" action={`?/${action}`} use:enhance class="space-y-5 py-5">
	<div><input type="hidden" bind:value={$form.id} /></div>
	<div>
		<label class="label">
			<span>Name</span>
			<input
				type="text"
				name="name"
				id="name"
				class="input"
				data-invalid={$errors.name}
				bind:value={$form.name}
			/>
		</label>
	</div>
	{#each $form.participants as participant, i (participant.id)}
		<div class="grid grid-cols-4">
			<input class="input hidden" type="hidden" bind:value={$form.participants[i].id} />
			<div>
				<label>
					<span>Character Name</span>
					<input type="text" class="input" bind:value={$form.participants[i].character.name} />
				</label>
			</div>
			<div>
				<label>
					<span>Initiative</span>
					<input type="number" class="input" bind:value={$form.participants[i].initiative} />
				</label>
			</div>
			<div>
				<label>
					<span>Current HP</span>
					<input type="number" class="input" bind:value={$form.participants[i].currentHP} />
				</label>
			</div>
			<div>
				<label
					><span>Remove</span><input
						type="checkbox"
						class="checkbox"
						bind:value={$form.participants[i].remove}
					/></label
				>
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
