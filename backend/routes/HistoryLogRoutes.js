import { Router } from "express";
import {
  getAllHistoryLogs,
  getHistoryLogById,
  addHistoryLog,
  updateHistoryLog,
  deleteHistoryLog,
} from "../controllers/HistoryLogController.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

router.get("/", getAllHistoryLogs);
router.get("/:id", getHistoryLogById);
router.post("/", addHistoryLog);
router.put("/:id", updateHistoryLog);
router.delete("/:id", deleteHistoryLog);

router.use(errorHandler);
export default router;
