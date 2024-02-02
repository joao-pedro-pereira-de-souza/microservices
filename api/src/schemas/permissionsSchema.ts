import {z} from 'zod';

const PermissionSchema = z.object({
   id: z.number().optional(),
   title: z.string(),
   number: z.number(),

   created_at: z.string().optional(),
   updated_at: z.string().optional(),
   deleted_at: z.string().optional(),
})


export type PermissionInterface = z.infer<typeof PermissionSchema>
