import {z} from 'zod'
export const registerValidation = z.object({
    name:z.string({required_error:"User Name is required..!"})
    ,
    email:z.string({
        required_error:"User email is required..!"
    }).email("Invalid Email"),
    password:z.string({
        required_error:"User password is required..!"
    }),
})