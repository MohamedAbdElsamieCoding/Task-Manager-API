import admin from "firebase-admin";

const initializeFirebase = () => {
  if (admin.apps.length) return;

  const config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  // Check if we have the minimum requirements
  if (!config.projectId || !config.clientEmail || !config.privateKey) {
    console.warn(
      "⚠️ Firebase warning: Missing environment variables for push notifications. Notifications are disabled."
    );
    return;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(config),
    });
    console.log("✅ Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
  }
};

initializeFirebase();

export const sendNotification = async (
  token: string,
  title: string,
  body: string
) => {
  await admin.messaging().send({
    token,
    notification: {
      title,
      body,
    },
  });
};
