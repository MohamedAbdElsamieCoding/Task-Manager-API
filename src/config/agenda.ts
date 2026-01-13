import Agenda from "agenda";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.warn(
    "⚠️ Agenda warning: MONGO_URL is missing. Background jobs will not work."
  );
}

export const agenda = new Agenda({
  db: {
    address: MONGO_URL || "", // Fallback to empty string to prevent total crash on load
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
