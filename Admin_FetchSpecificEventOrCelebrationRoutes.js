import express from "express";
import { getSpecificAnnouncement } from "../controllers/Admin_FetchSpecificEventOrCelebrationController.js";

const router = express.Router();

router.get("/announcement/:id/:type", getSpecificAnnouncement);

export default router;
