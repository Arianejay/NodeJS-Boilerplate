import express from "express";
import { GetUsers } from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", validateToken, GetUsers);

export default router;
