import { z } from 'zod';

const schema = z.object({
	name: z.string().nonempty(),
	id: z.string().optional(),
	participants: z.array(
		z.object({
			character: z.object({
				name: z.string()
			}),
			initiative: z.number(),
			id: z.string(),
			currentHP: z.number(),
			remove: z.boolean().default(false)
		})
	)
});

export { schema };
