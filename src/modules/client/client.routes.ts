import { Router } from "express";
import { createClientCont, updateClientCont } from "./client.controller.js";
import { authenticateToken } from "../../middleware/authenticateToken.js";

const clientRouter = Router();

clientRouter.use(authenticateToken);

clientRouter.post("/create", createClientCont);
clientRouter.put("/update", updateClientCont);

export default clientRouter;
