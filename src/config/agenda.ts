import Agenda from "agenda";

const MONGO_URL = process.env.MONGO_URL;

export const agenda = new Agenda({
  db: {
    address: MONGO_URL,
    collection: "agendaJobs",
  },
  processEvery: "30 seconds",
});
agenda.on("ready", () => {
  console.log("Agenda is ready");
});

agenda.on("error", (err) => {
  console.log(`Agenda error : ${err}`);
});
