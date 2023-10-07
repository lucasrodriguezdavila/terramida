export const FIREBASE_PRIVATE_KEY =
  process.env.NEXT_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") as string;

export const FIREBASE_PRIVATEKEY_ID = process.env
  .NEXT_FIREBASE_PRIVATE_KEY_ID as string;

export const FIREBASE_CLIENT_EMAIL = process.env
  .NEXT_FIREBASE_CLIENT_EMAIL as string;
