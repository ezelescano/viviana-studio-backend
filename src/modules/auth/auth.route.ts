import { Router } from "express";
import { jwtLogingCont } from "./auth.controller.js";

const loginRouter = Router();

loginRouter.post("/login", jwtLogingCont);

export default loginRouter;