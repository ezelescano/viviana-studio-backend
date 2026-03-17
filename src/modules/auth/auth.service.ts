import { JWT_SECRET } from "../../configs/envs.js";
import { prisma } from "../../configs/prisma.js";
import { validateCredentials } from "../../utils/validationCredentials.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const jwtLoginServ = async (email: string, password: string) : Promise<{token: string}> => {
   validateCredentials(email, password);// check the credentials

   const user = await prisma.account.findUnique({
    where : { email }});

    if(!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user?.password)
    
    if(!match) throw new Error("Invalid credentials");
    const token = jwt.sign({email: user?.email},JWT_SECRET, {expiresIn: "4h"} )

    return {token};
};

export const jwtRegisterServ = async (email: string, password: string) : Promise<{token: string}> => {
    validateCredentials(email, password);
    return {token: "your-jwt-token"}
};
