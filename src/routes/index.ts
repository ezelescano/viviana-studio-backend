import { Router } from "express";
import loginRouter from "../modules/auth/auth.route.js";
import clientRouter from "../modules/client/client.routes.js";

const router = Router();

router.use("/auth", loginRouter );

router.use("/client", clientRouter);

export default router;