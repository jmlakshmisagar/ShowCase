import { initializeApp } from "https://www.gstatic.com/firebasejs/VERSION/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/VERSION/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/VERSION/firebase-database.js";

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const database = getDatabase(app);
let loginButton = document.getElementById("Google");
loginButton.addEventListener('click', (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const username = "user123";
      const email = "user@example.com";
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email
      })
      .then(() => {
        alert(`Successful login! Welcome, ${user.displayName}!`);
        storeUserInfo(user.uid, user.displayName, user.photoURL);
        setTimeout(() => {
          window.location.href = `Profile.html?uid=${user.uid}`;
        }, 1000);
      })
      .catch((error) => {
        console.error("Error storing data in the Realtime Database:", error);
      });
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
});
function storeUserInfo(uid, displayName, photoURL) {
  const userRef = ref(database, 'users/' + uid);
  set(userRef, {
    displayName: displayName,
    photoURL: photoURL
  })
  .then(() => {
    console.log("User information stored successfully.");
  })
  .catch((error) => {
    console.error("Error storing user information:", error);
  });
};
 




















