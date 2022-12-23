import { Router } from "express";
import { token } from "../middlewares/token.middlewares.js";
import { getUserInfo } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users/me", token, getUserInfo);

export default router;
