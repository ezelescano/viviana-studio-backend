import { Router } from "express";
import loginRouter from "../modules/auth/auth.route.js";

const router = Router();

router.use("/auth", loginRouter );

export default router;