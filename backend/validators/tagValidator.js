import { body, param } from "express-validator";

export const validateTag = [
  body("name").notEmpty().withMessage("Name is required"),
  body("color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Color must be in the format #FFFFFF"),
];

export const validateTagId = [
  param("id").isInt().withMessage("Tag ID must be an integer"),
];
