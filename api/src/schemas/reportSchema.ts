
import {z} from 'zod';

export const UseReportSchema = z.object({
   id_template: z.number(),
   data: z.object({}).optional(),
})


export type UseReportInterface = z.infer<typeof UseReportSchema>
