import { Router } from "express";
import { jwtLogingCont, jwtRegisterCont, logoutCont } from "./auth.controller.js";

const loginRouter = Router();

loginRouter.post("/login", jwtLogingCont);
loginRouter.post("/register", jwtRegisterCont);
loginRouter.post("/logout", logoutCont)

export default loginRouter;