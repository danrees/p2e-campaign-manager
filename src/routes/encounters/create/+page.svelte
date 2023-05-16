<script lang="ts">
	import type { Participant } from '$lib/tools';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, enhance } = superForm(data.form, { dataType: 'json' });
</script>

<form method="post" action="?/create" use:enhance>
	<div>
		<label class="label">
			<span>Name</span>
			<input
				type="text"
				name="encounter_name"
				id="encounter_name"
				class="input"
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
	<div>
		<label class="label">
			<span>Add Participant</span>
			<input type="text" name="character" id="character" class="input" />
		</label>
	</div>
	<button class="btn" type="submit">Submit</button>
</form>
