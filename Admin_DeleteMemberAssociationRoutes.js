import express from "express";
import { deleteAssociationMember } from "../controllers/Admin_DeleteMemberAssociationController.js";

const router = express.Router();

router.delete(
  "/admin/association-members/:id",
  deleteAssociationMember
);

export default router;
