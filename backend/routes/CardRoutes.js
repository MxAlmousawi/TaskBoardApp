import { Router } from "express";
import {
  getAllCards,
  getCardById,
  addCard,
  updateCard,
  deleteCard,
  swapCard,
} from "../controllers/CardController.js";
import {
  validateCard,
  validateCardId,
  validateColumnId,
  validateSwapCard,
} from "../validators/cardValidator.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();
router.get("/", getAllCards);
router.get("/:id", validateCardId, getCardById);
router.post("/", validateCard, addCard);
router.put("/:id", validateCardId, validateCard, updateCard);
router.delete("/:id", validateCardId, deleteCard);
router.post("/swap", validateSwapCard, swapCard);

router.use(errorHandler);
export default router;
