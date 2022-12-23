import { Router } from "express";
import { token } from "../middlewares/token.middlewares.js";
import {
  urlId,
  urlUser,
  shortUrl,
  alreadyShortened,
  urlModelValidation,
} from "../middlewares/url.middlewares.js";
import {
  getUrl,
  deleteUrl,
  shortenUrl,
  redirectToUrl,
} from "../controllers/urls.controllers.js";

const router = Router();

router.delete("/urls/:id", token, urlId, urlUser, deleteUrl);
router.get("/urls/:id", urlId, getUrl);
router.get("/urls/open/:shortUrl", shortUrl, redirectToUrl);
router.post(
  "/urls/shorten",
  token,
  urlModelValidation,
  alreadyShortened,
  shortenUrl
);

export default router;
