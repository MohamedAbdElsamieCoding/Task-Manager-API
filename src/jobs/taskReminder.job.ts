import { Job } from "agenda";
import { agenda } from "../config/agenda";
import { PushNotificationJobData } from "../types/pushNotification";
import { sendNotification } from "../services/push.service";
import { AppError } from "../utils/appError";
import { httpStatusText } from "../utils/httpStatusText";

agenda.define(
  "send-push-notification",
  { concurrency: 5, lockLifetime: 10000, lockLimit: 10 },
  async (job: Job<PushNotificationJobData>) => {
    if (!job.attrs.data) {
      throw new AppError("Job data is missing", httpStatusText.ERROR, 400);
    }
    const { token, title, body } = job.attrs.data;

    await sendNotification(token, title, body);

    console.log("🔔 Push notification sent successfully");
  }
);
