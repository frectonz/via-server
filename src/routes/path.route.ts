import { Router } from "express";

import protect from "../middleware/protect";
import {
  newPath,
  searchPath,
  getPathById,
} from "../controllers/path.controller";

const router = Router();

router.post("/new", protect(), newPath);
router.get("/:id", protect(), getPathById);
router.get("/search/:fromName/:toName", protect(), searchPath);

export default router;
