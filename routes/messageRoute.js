import express from "express";
import { saveMessage, getAllMessages } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", saveMessage);
router.get("/messages", getAllMessages);

export default router;
