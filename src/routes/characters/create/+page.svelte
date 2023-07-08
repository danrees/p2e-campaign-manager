<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, enhance } = superForm(data.form);
</script>

<div class="py-5">
	<form method="post" action="?/importCharacter" use:enhance>
		<label class="label">
			<span>Upload JSON</span>
			<textarea class="textarea" name="text" bind:value={$form.text} />
		</label>
		<button class="btn variant-filled-primary" type="submit">Submit</button>
	</form>
</div>
