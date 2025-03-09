import { Router } from "express";
import {
  getAllColumns,
  getColumnById,
  addColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/ColumnController.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

router.get("/", getAllColumns);
router.get("/:id", getColumnById);
router.post("/", addColumn);
router.put("/:id", updateColumn);
router.delete("/:id", deleteColumn);

router.use(errorHandler);
export default router;
