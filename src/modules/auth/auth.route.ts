import { Router } from "express";
import { jwtLogingCont, jwtRegisterCont } from "./auth.controller.js";

const loginRouter = Router();

loginRouter.post("/login", jwtLogingCont);
loginRouter.post("/register", jwtRegisterCont)

export default loginRouter;