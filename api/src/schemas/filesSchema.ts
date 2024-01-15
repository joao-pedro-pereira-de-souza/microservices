
import {z} from 'zod';

export const UploadSchema = z.object({
   file: z.any().refine((files) => files.length === 1, 'File is required.')
})


export type UploadInterface = z.infer<typeof UploadSchema>
