
import {z} from 'zod';

export const CreateTemplateSchema = z.object({
   template_url: z.string(),
   title: z.string(),
   image_url: z.string(),
})


export type CreateTemplateInterface = z.infer<typeof CreateTemplateSchema>
