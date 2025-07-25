var admin = require("firebase-admin");

var serviceAccount = require(".env.firebaseAdminKey.json");

export const adminFirebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(serviceAccount);
