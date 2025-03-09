import asyncHandler from "../middlewares/asyncHandler.js";
import HistoryLog from "../models/HistoryLog.js";
import NotFoundError from "../errors/NotFoundError.js";

// Get all history logs
export const getAllHistoryLogs = asyncHandler(async (req, res) => {
  const historyLogs = await HistoryLog.findAll({
    order: [["date", "DESC"]],
  });
  res.json(historyLogs);
});

// Get history log by ID
export const getHistoryLogById = asyncHandler(async (req, res) => {
  const historyLog = await HistoryLog.findByPk(req.params.id);
  if (!historyLog) {
    throw new NotFoundError("History log not found");
  }
  res.json(historyLog);
});

// Add a new history log
export const addHistoryLog = asyncHandler(async (req, res) => {
  const historyLog = await HistoryLog.create(req.body);
  res.status(200).json(historyLog);
});

// Update a history log
export const updateHistoryLog = asyncHandler(async (req, res) => {
  const historyLog = await HistoryLog.findByPk(req.params.id);
  if (!historyLog) {
    throw new NotFoundError("History log not found");
  }
  await historyLog.update(req.body);
  res.json(historyLog);
});

// Delete a history log
export const deleteHistoryLog = asyncHandler(async (req, res) => {
  const historyLog = await HistoryLog.findByPk(req.params.id);
  if (!historyLog) {
    throw new NotFoundError("History log not found");
  }
  await historyLog.destroy();
  res.status(200).json({ message: "History log deleted" });
});
