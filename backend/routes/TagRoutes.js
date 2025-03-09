import { Router } from "express";
import {
  getAllTags,
  getTagById,
  addTag,
  updateTag,
  deleteTag,
} from "../controllers/TagController.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

router.get("/", getAllTags);
router.get("/:id", getTagById);
router.post("/", addTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

router.use(errorHandler);
export default router;
