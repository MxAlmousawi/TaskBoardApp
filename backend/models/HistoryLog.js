// models/HistoryLog.js
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const HistoryLog = sequelize.define("HistoryLog", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default HistoryLog;
