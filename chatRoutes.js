import express from "express";
import { chatHandler } from "./chatcontrollers.js";

const router = express.Router();

router.post("/chat", chatHandler);

export default router;