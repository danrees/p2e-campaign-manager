<script lang="ts">
	import Encounter from '$lib/comonents/Encounter.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const form = superForm(data.form, { dataType: 'json' });
	$: characters = data.characters;
</script>

<div>
	<Encounter action={'update'} dataForm={form} availableCharacters={characters} />
</div>
