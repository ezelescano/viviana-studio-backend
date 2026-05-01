import { Request, Response } from "express";
import { jwtLoginServ, jwtRegisterServ, logoutServ } from "./auth.service.js";
import { HttpError } from "../../errors/HttpErrors.js";


// controller for Login and register with JWT
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
  
  const { email, password, role} = req.body;
  
  try {
    const user = await jwtRegisterServ(email, password, role);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutCont = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  try {
    if(!authHeader) {
      return res.status(400).json({ message: "No token provided"})
    } 

    const token = authHeader.split(" ")[1];

    logoutServ(token);
    res.status(200).json({ message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  };
}
