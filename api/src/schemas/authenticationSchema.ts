
import {z} from 'zod';

export const AuthenticationLoginSchema = z.object({
   email: z.string(),
   password: z.string(),
})


export type AuthenticationLoginInterface = z.infer<typeof AuthenticationLoginSchema>
