import { Request, Response } from "express";
import { jwtLoginServ, jwtRegisterServ } from "./auth.service.js"

export const jwtLogingCont= async (req: Request, res: Response) => {
    const user = await jwtLoginServ(req.body.email, req.body.password);
    res.status(200).json(user);
};

export const jwtRegisterCont = async (req: Request, res: Response) => {
    const user = await jwtRegisterServ(req.body.email, req.body.password);
    res.status(200).json(user);
};

