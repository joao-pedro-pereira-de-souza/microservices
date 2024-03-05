
import {z} from 'zod';

export const AuthenticationLoginSchema = z.object({
   email: z.string(),
   password: z.string(),
   type_redirect: z.enum(['bull_dashboard']).optional()
})


export type AuthenticationLoginInterface = z.infer<typeof AuthenticationLoginSchema>
