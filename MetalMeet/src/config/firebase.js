import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import ReactObserver from 'react-event-observer';

const firebaseConfig = {
  apiKey: "AIzaSyCvbwnKqoUdM0808ynmiesm4521AIENG-4",
  authDomain: "metalmeet-a652a.firebaseapp.com",
  projectId: "metalmeet-a652a",
  storageBucket: "metalmeet-a652a.appspot.com",
  messagingSenderId: "398149391609",
  appId: "1:398149391609:web:f6e32cb2b9fc5b06bc7e28"
};

const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const firebaseObserver = ReactObserver();

auth.onAuthStateChanged(function(user) {
    firebaseObserver.publish("authStateChanged", loggedIn())
});

export function loggedIn() {
    return !!auth.currentUser;
}