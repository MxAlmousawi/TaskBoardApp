import { body, param } from "express-validator";

export const validateColumn = [
  body("name").notEmpty().withMessage("Name is required"),
];

export const validateColumnId = [
  param("id").isInt().withMessage("Column ID must be an integer"),
];
