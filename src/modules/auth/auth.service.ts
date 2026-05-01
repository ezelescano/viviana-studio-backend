import { JWT_SECRET } from "../../configs/envs.js";
import { prisma } from "../../configs/prisma.js";
import { BadRequest, Unauthorized } from "../../errors/index.js";
import { validateCredentials } from "../../utils/validationCredentials.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { tokenBlacklist } from "../../utils/blackList.js";


// service for Login and register with JWT
export async function jwtLoginServ(email: string,
  password: string): Promise<{ token: string; }> {
  validateCredentials(email, password); // check the credentials

  const user = await prisma.account.findUnique({
    where: { email },
  });

  if (!user) throw Unauthorized("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Unauthorized("Invalid credentials");
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET!,
    { expiresIn: "4h" }
  );

  return { token };
}

export const jwtRegisterServ = async (
  email: string,
  password: string,
  role: string
): Promise<{ token: string }> => {

  validateCredentials(email, password);
  const existingUSer = await prisma.account.findUnique({
    where: { email },
  });

  if(existingUSer) throw BadRequest("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.account.create({
    data: {
        email,
        password: hashedPassword,
        role: Role.EMPLOYEE
    }
  }) 
  const token = jwt.sign(
    {
      id: result.id,
      role: result.role,
    },
    JWT_SECRET!,
    { expiresIn: "4h"}
  );
  console.log("termine el proceso de registro");
  
  return { token };
};

export const logoutServ = async (token: string)=> {
  tokenBlacklist.add(token);
};