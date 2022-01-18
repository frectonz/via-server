import { Router } from "express";

import { newSession } from "../controllers/session.controller";

const router = Router();

router.get("/new", newSession);

export default router;
