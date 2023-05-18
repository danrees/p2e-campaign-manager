<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance } = superForm(data.uploadForm);
	const { form: form2, enhance: enhance2, allErrors } = superForm(data.importForm);
</script>

<form method="post" action="?/upload" enctype="multipart/form-data" use:enhance>
	<label>
		<span>Upload JSON</span>
		<input class="input" type="file" name="file" id="file" />
	</label>
	<button class="btn variant-filled-primary" type="submit">Submit</button>
</form>
<p>https://pathbuilder2e.com/json.php?id=140976</p>
<ul>
	{#each $allErrors as err}
		<li>{err.message} - {err.path}</li>
	{/each}
</ul>
<form method="post" action="?/importCharacter" use:enhance2>
	<label>
		<span>Pathbuilder URL</span>
		<input class="input" type="number" name="id" id="id" bind:value={$form2.id} />
	</label>
	<button class="btn variant-filled-primary" type="submit">Submit</button>
</form>
