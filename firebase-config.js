/**
 * Replace the placeholder values with the Firebase config snippet from
 * Project settings ➜ General ➜ Your apps ➜ Web app.
 */
window.FEWES_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAxE9n5O6C63ThuRZE_ls7fXBc23rvagng",
  authDomain: "fewes-3d46a.firebaseapp.com",
  databaseURL: "https://fewes-3d46a.firebaseio.com",
  projectId: "fewes-3d46a",
  storageBucket: "fewes-3d46a.firebasestorage.app",
  messagingSenderId: "687032323171",
  appId: "1:687032323171:web:d6e8276baee8cf009efc56",
  measurementId: "G-BLEEWT69SZ" // optional
};

if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(window.FEWES_FIREBASE_CONFIG);
}
