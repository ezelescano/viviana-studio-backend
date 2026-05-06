import { Router } from "express";
import { createClientCont, updateClientCont } from "./client.controller.js";

const clientRouter = Router();

clientRouter.post("/create", createClientCont);
clientRouter.put("/update", updateClientCont);

export default clientRouter;