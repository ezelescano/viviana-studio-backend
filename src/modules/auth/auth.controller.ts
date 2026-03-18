import { Request, Response } from "express";
import { jwtLoginServ, jwtRegisterServ } from "./auth.service.js";
import { HttpError } from "../../errors/HttpErrors.js";

export const jwtLogingCont = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await jwtLoginServ(email, password);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const jwtRegisterCont = async (req: Request, res: Response) => {
  const user = await jwtRegisterServ(req.body.email, req.body.password);
  res.status(200).json(user);
};
