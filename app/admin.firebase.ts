import * as adminFirebase from "firebase-admin";

import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from "@/utils/constants";

const admin =
  adminFirebase.apps.length === 0
    ? adminFirebase.initializeApp({
        credential: adminFirebase.credential.cert({
          projectId: "terramida",
          privateKey: FIREBASE_PRIVATE_KEY,
          clientEmail: FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: "https://terramida.firebaseio.com",
      })
    : adminFirebase.app();

export const db = adminFirebase.firestore();

export { admin };
