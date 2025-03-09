// models/Column.js
import { DataTypes } from "sequelize";
import Card from "./Card.js";
import sequelize from "../database/db.js";

const Column = sequelize.define("Column", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Column.hasMany(Card, { as: "cards", foreignKey: "columnId" });
Card.belongsTo(Column, { foreignKey: "columnId", as: "column" });

export default Column;
