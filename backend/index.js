import express from "express";
import "dotenv/config";
import connectDb from "./database/connect.js";
import tagRoutes from "./routes/TagRoutes.js";
import cardRoutes from "./routes/CardRoutes.js";
import columnRoutes from "./routes/ColumnRoutes.js";
import historyLogRoutes from "./routes/HistoryLogRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

connectDb();

const app = express();
app.use(errorHandler);
app.use(express.json());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/tags", tagRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/historyLogs", historyLogRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
