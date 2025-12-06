import express from "express";
import cors from "cors";
import { loadSalesData } from "./utils/csvLoader.js";
import { setSalesData } from "./services/salesService.js";
import salesRouter from "./routes/salesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

async function start() {
  const records = await loadSalesData();
  setSalesData(records);

  app.use("/api/sales", salesRouter);

  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

start();
