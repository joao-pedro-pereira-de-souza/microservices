
import {z} from 'zod';

const UserSchema = z.object({
   id: z.number().optional(),
   email: z.string().email(),
   name: z.string(),
   password: z.string(),

   created_at: z.string().optional(),
   updated_at: z.string().optional(),
   deleted_at: z.string().optional(),
})


export const CreateUserSchema = z.object({
   email: z.string().email(),
   name: z.string(),
   password: z.string(),
})


export type UserInterface = z.infer<typeof UserSchema>
export type CreateUserInterface = z.infer<typeof CreateUserSchema>
