// Centralized environment variable access
// Note: In Create React App, env vars must start with REACT_APP_

type RequiredEnvKeys =
  | 'REACT_APP_FIREBASE_API_KEY'
  | 'REACT_APP_FIREBASE_AUTH_DOMAIN'
  | 'REACT_APP_FIREBASE_PROJECT_ID'
  | 'REACT_APP_FIREBASE_STORAGE_BUCKET'
  | 'REACT_APP_FIREBASE_MESSAGING_SENDER_ID'
  | 'REACT_APP_FIREBASE_APP_ID';

function readEnv(key: RequiredEnvKeys): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  firebaseApiKey: readEnv('REACT_APP_FIREBASE_API_KEY'),
  firebaseAuthDomain: readEnv('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  firebaseProjectId: readEnv('REACT_APP_FIREBASE_PROJECT_ID'),
  firebaseStorageBucket: readEnv('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  firebaseMessagingSenderId: readEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  firebaseAppId: readEnv('REACT_APP_FIREBASE_APP_ID'),
  // Optional: Only used if you enabled Google Analytics in Firebase
  firebaseMeasurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
} as const;

export type Env = typeof ENV;


