import express from "express";
import { fetchSpecificMember } from "../controllers/Admin_FetchSpecificMemberAssociationController.js";

const router = express.Router();

router.get(
  "/admin/association-members/:id",
  fetchSpecificMember
);

export default router;
