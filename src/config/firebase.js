import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactObserver from "react-event-observer";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// .projectConfigManager().updateProjectConfig({
//   passwordPolicyConfig: {
//     enforcementState: 'ENFORCE',
//     forceUpgradeOnSignin: true,
//     constraints: {
//       requireUppercase: true,
//       requireLowercase: true,
//       requireNonAlphanumeric: true,
//       requireNumeric: true,
//       minLength: 8,
//       maxLength: 64,
//     },
//   },
// })

export const firebaseObserver = ReactObserver();

auth.onAuthStateChanged(function (user) {
  firebaseObserver.publish("authStateChanged", loggedIn());
});

export function loggedIn() {
  return !!auth.currentUser;
}
