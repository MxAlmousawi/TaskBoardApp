import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Tag;
