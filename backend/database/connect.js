import sequelize from "./db.js";
import seedDatabase from "../seeders/seed.js";
import Tag from "../models/Tag.js";

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    const isEmpty = await Tag.count()
    if (isEmpty === 0) {
      await seedDatabase();
    } else {
      await sequelize.sync({ force: false });
    }
  } catch (err) {
    console.log("Database connection failed!");
    console.log(err);
  }
};

export default connectDb;
