
import {z} from 'zod';

export const UseReportSchema = z.object({
   id_template: z.number().optional(),
   data: z.string().optional(),
})


export type UseReportInterface = z.infer<typeof UseReportSchema>
