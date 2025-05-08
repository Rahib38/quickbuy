import {z} from 'zod'
export const loginValidation = z.object({
    email:z.string({
        required_error:"User email is required..!"
    }).email("Invalid Email"),
    password:z.string({
        required_error:"User password is required..!"
    }),
})