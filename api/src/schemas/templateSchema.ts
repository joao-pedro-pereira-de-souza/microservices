
import {z} from 'zod';

export const CreateTemplateSchema = z.object({
   id: z.number().optional(),
   template_url: z.string(),
   title: z.string(),
   image_url: z.string(),

   created_at: z.string().optional(),
   updated_at: z.string().optional(),
   deleted_at: z.string().optional(),
})

export const FindTemplateSchema = z.object({
   id: z.string()
})


export type CreateTemplateInterface = z.infer<typeof CreateTemplateSchema>
