import { Router } from "express";
import {
  signUpModelValidation,
  emailValidation,
} from "../middlewares/signUp.middlewares.js";
import {
  signInModelValidation,
  validateCredentials,
} from "../middlewares/signIn.middlewares.js";
import { insertUser, sendJwt } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signUpModelValidation, emailValidation, insertUser);
router.post("/signin", signInModelValidation, validateCredentials, sendJwt);

export default router;
