import { body, param } from "express-validator";

export const validateHistoryLog = [
  body("date").isISO8601().withMessage("Date must be a valid date"),
  body("message").notEmpty().withMessage("Message is required"),
];

export const validateHistoryLogId = [
  param("id").isInt().withMessage("History Log ID must be an integer"),
];
