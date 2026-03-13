import { Request, Response } from "express";
import { jwtLoginServ } from "./auth.service.js"

export const jwtLogingCont= async (req: Request, res: Response) => {
    const user = await jwtLoginServ();
res.status(200).json(user)    
}