import express from "express";
import { getAdminAnnouncementFeed } from "../controllers/Admin_AnnouncementPageFetchController.js";

const router = express.Router();

router.get("/announcements", getAdminAnnouncementFeed);

export default router;
