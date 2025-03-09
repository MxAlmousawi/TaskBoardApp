import { DataTypes } from "sequelize";
import Tag from "./Tag.js";
import sequelize from "../database/db.js";

const Card = sequelize.define("Card", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Card.belongsTo(Tag, { as: "tag", foreignKey: "tagId" });

Card.belongsTo(Card, { as: "prevCard", foreignKey: "prevCardId" });
Card.belongsTo(Card, { as: "nextCard", foreignKey: "nextCardId" });

export default Card;
