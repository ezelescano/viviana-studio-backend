import { Request, Response } from "express";
import { createClientSer, updateClientSer } from "./client.service.js";
import { HttpError } from "../../errors/HttpErrors.js";
import { BadRequest } from "../../errors/index.js";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createClientCont = async (req: Request, res: Response) => {
    try {
      const { name, phone, email } = req.body;
      
      if (!emailRegex.test(email)) throw BadRequest("Invalid email format");
      if (!name || !phone || !email)
      return res
        .status(400)
        .json({ message: "Name, phone and email are required" });

    const newClient = await createClientSer({ name, phone, email });
    res.status(201).json(newClient);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    }
  }
};

export const updateClientCont = (req: Request, res: Response) => {
  try {
    const { phone } = req.params;
    const { name, email } = req.body;
    const actualPhone = req.body.phone;

    if (!emailRegex.test(email)) throw BadRequest("Invalid email format");

  } catch (error) {
    
  }
}
