import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlAnalytics,
} from "../controllers/url.controller";

const router = Router();

router.post("/shorten", createShortUrl);
// router.get("/:shortUrl", redirectToOriginalUrl);
// router.get("/analytics/:shortUrl", getUrlAnalytics);

export default router;
