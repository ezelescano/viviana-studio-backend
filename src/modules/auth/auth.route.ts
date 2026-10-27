import { Router } from "express";

import {
  jwtLogingCont,
  jwtRegisterCont,
  logoutCont,
} from "./auth.controller.js";

import { authenticateToken } from "../../middleware/authenticateToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const loginRouter = Router();

// Login público
loginRouter.post("/login", jwtLogingCont);

// Solo un ADMIN autenticado puede registrar usuarios
loginRouter.post(
  "/register",
  authenticateToken,
  isAdmin,
  jwtRegisterCont
);

// Logout requiere autenticación
loginRouter.post(
  "/logout",
  authenticateToken,
  logoutCont
);

export default loginRouter;