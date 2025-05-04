import { Prisma, Role } from "@prisma/client"
import { TUser } from "./user.interface"
import bcrypt from 'bcrypt'
import { prisma } from "../../config/prisma"

const createUser = async(payload:TUser)=>{
    const hashedPassword:string =await bcrypt.hash(payload.password,12)
    console.log("create")

    const userData={
        name:payload.name,
        email:payload.email,
        role:Role.USER,
        password:hashedPassword
    }

    const result = await prisma.user.create({
        data:userData
    })

    console.log("data", result)

    return result
}

export const userService = {
createUser
}