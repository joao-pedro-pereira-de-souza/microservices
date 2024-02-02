
import {z} from 'zod';

export const QueryListPageSchema = z.object({
   page: z.number().optional().default(1),
   limit: z.number().optional().default(10),
   search_text: z.string().optional(),
})


export type QueryListPageInterface = z.infer<typeof QueryListPageSchema>
