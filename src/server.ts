import app from "./app.js";
import { connectDb } from "./config/db.js";
import { agenda } from "./config/agenda.js";
import "./jobs/taskReminder.job.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDb();
  await agenda.start();
  console.log("Agenda started");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
