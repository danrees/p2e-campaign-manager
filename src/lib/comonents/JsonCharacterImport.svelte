<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let formData;
	const { form, enhance } = superForm(formData);
</script>

<div class="py-5">
	<form method="post" action="?/json" use:enhance>
		<label class="label">
			<span>Upload JSON</span>
			<input class="input" name="text" id="text" bind:value={$form.text} />
		</label>
		<button class="btn variant-filled-primary" type="submit">Submit</button>
	</form>
</div>
