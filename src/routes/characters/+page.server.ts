import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { getInstance } from '$lib/surreal';

const schemaUpload = z.object({
	file: z.any()
});

const schemaImport = z.object({
	id: z.number().gt(0)
});

export const load = (async () => {
	const uploadForm = await superValidate(schemaUpload);
	const importForm = await superValidate(schemaImport);

	return { uploadForm, importForm };
}) satisfies PageServerLoad;

export const actions = {
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadForm = await superValidate(formData, schemaUpload);

		if (!uploadForm.valid) {
			return fail(400, { uploadForm });
		}
		const file = formData.get('file');
		if (file instanceof File) {
			console.log(file);
		} else {
			console.log('problem, file was: ', typeof file);
			console.log(file);
			return fail(500, { uploadForm });
		}
		const data = JSON.parse(await file.text());
		const db = await getInstance();
		await db.signin({ user: 'root', pass: 'password' });
		await db.use('campaign_planner', 'pathfinder');
		const resp = await db.create('characters', data.build);
		console.log(resp);
		return { uploadForm };
	},
	importCharacter: async ({ request, fetch }) => {
		console.log('Help');
		const form = await superValidate(request, schemaImport);
		console.log(form.data.id);
		if (!form.valid) {
			console.log('failed validation');
			return fail(400, { importForm: form });
		}
		const dataResp = await fetch(`https://pathbuilder2e.com/json.php?id=${form.data.id}`);

		const data = await dataResp.json();
		const db = await getInstance();
		await db.signin({ user: 'root', pass: 'password' });
		await db.use('campaign_planner', 'pathfinder');
		const resp = await db.create(`characters:${form.data.id}`, data.build);
		console.log(resp);
		return { importForm: form };
	}
} satisfies Actions;
