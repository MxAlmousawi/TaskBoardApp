import { body, param } from "express-validator";

export const validateCard = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description must be a string"),
  body("tagId").notEmpty().isInt().withMessage("Tag ID must be an integer"),
  body("columnId")
    .notEmpty()
    .isInt()
    .withMessage("Column ID must be an integer"),
];

export const validateCardId = [
  param("id").isInt().withMessage("Card ID must be an integer"),
];

export const validateColumnId = [
  param("id").isInt().withMessage("Column ID must be an integer"),
];

export const validateSwapCard = [
  body("id").isInt().withMessage("Card ID must be an integer"),
  body("newPrevId")
    .optional()
    .isInt()
    .withMessage("New previous card ID must be an integer"),
  body("newNextId")
    .optional()
    .isInt()
    .withMessage("New next card ID must be an integer"),
  body("newColumnId").isInt().withMessage("New column ID must be an integer"),
];
