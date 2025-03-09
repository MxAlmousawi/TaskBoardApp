import sequelize from "../database/db.js";
import Tag from "../models/Tag.js";
import HistoryLog from "../models/HistoryLog.js";
import Column from "../models/Column.js";
import Card from "../models/Card.js";

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const tags = await Tag.bulkCreate([
      { name: "Urgent", color: "#FF0000" },
      { name: "Bug", color: "#FFA500" },
      { name: "Feature", color: "#0000FF" },
      { name: "Improvement", color: "#008000" },
    ]);

    const columns = await Column.bulkCreate([
      { name: "BackLog" },
      { name: "To Do" },
      { name: "Done" },
    ]);

    for (const column of columns) {
      let prevCardId = null;
      for (let i = 1; i <= 3; i++) {
        const card = await Card.create({
          title: `Card ${i} in ${column.name}`,
          description: `Description for card ${i} in ${column.name}`,
          tagId: tags[i % tags.length].id,
          columnId: column.id,
          prevCardId: prevCardId,
          nextCardId: null,
        });
        if (prevCardId) {
          const prevCard = await Card.findByPk(prevCardId);
          await prevCard.update({ nextCardId: card.id });
        }
        prevCardId = card.id;
      }
    }

    await HistoryLog.bulkCreate([
      { date: new Date(), message: "Database seeded successfully" },
    ]);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
};

export default seedDatabase;
