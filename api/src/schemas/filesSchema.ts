
import {z} from 'zod';

export const UploadSchema = z.object({
   file: z.any().refine((files) => files.length === 1, 'File is required.')
});

export const RemoveSchema = z.object({
   url: z.string().min(1)
});

export type UploadInterface = z.infer<typeof UploadSchema>
export type RemoveInterface = z.infer<typeof RemoveSchema>
