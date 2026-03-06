import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>{
    res.send("hola estoy funcionando");
});

export default router;