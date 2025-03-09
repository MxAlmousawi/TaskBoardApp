import asyncHandler from "../middlewares/asyncHandler.js";
import Tag from "../models/Tag.js";
import NotFoundError from "../errors/NotFoundError.js";

export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

export const getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) {
    throw new NotFoundError("Tag not found");
  }
  res.json(tag);
});

export const addTag = asyncHandler(async (req, res) => {
  const tag = await Tag.create(req.body);
  res.status(200).json(tag);
});

export const updateTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) {
    throw new NotFoundError("Tag not found");
  }
  await tag.update(req.body);
  res.json(tag);
});

export const deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) {
    throw new NotFoundError("Tag not found");
  }
  await tag.destroy();
  res.status(200).json({ message: "Tag deleted" });
});
