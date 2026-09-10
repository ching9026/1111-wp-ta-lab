import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOhYhcN4qYI-DgAs_E0OIWBV4QRYoSzqg",
  authDomain: "fir-2a4fc.firebaseapp.com",
  projectId: "fir-2a4fc",
  storageBucket: "fir-2a4fc.appspot.com",
  messagingSenderId: "1064281565993",
  appId: "1:1064281565993:web:5edc6a75e4221f4124e538",
  measurementId: "G-V1D0QMT1K1",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const db = getFirestore(app);

const setLoggedInUI = (loggedIn) => {
  document.querySelector(".login").style.display = loggedIn ? "none" : "block";
  document.querySelector(".container").style.display = loggedIn ? "block" : "none";
};

const getDiaryInput = () => ({
  title: document.getElementById("diary-title").value.trim(),
  content: document.getElementById("diary-content").value,
});

const clearDiaryInput = () => {
  document.getElementById("diary-title").value = "";
  document.getElementById("diary-content").value = "";
};

const getCurrentUserEmail = () => {
  const email = auth.currentUser?.email;
  if (!email) {
    alert("Please sign in first.");
    return null;
  }
  return email;
};

const start = () => {
  setLoggedInUI(Boolean(auth.currentUser));
  document.getElementById("login").addEventListener("click", login);
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("delete-account").addEventListener("click", deleteAccount);
  document.getElementById("create").addEventListener("click", createContent);
  document.getElementById("read").addEventListener("click", readContent);
  document.getElementById("update").addEventListener("click", updateContent);
  document.getElementById("delete").addEventListener("click", deleteContent);
};

const login = async () => {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    console.log("user:", result.user);
    setLoggedInUI(true);
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    setLoggedInUI(false);
    alert("You've been logged out.");
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }
};

const deleteAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please sign in first.");
    return;
  }

  try {
    await deleteUser(user);
    setLoggedInUI(false);
    alert("Your account has been deleted.");
  } catch (error) {
    console.error("Account deletion failed:", error);
    alert("Account deletion failed. You may need to sign in again first.");
  }
};

const createContent = async () => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) return;

  const { title, content } = getDiaryInput();
  if (!title) {
    alert("Please enter a diary title.");
    return;
  }

  try {
    await setDoc(doc(db, userEmail, title), {
      timestamp: new Date(),
      title,
      content,
    });
    alert(`Created: "${title}"`);
    clearDiaryInput();
  } catch (error) {
    console.error("Create failed:", error);
    alert("Unable to create the diary entry.");
  }
};

const readContent = async () => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) return;

  document.getElementById("diary-content").value = "";
  const { title } = getDiaryInput();

  try {
    if (!title) {
      const querySnapshot = await getDocs(collection(db, userEmail));
      if (querySnapshot.empty) {
        alert("No diary entries yet.");
        return;
      }

      const entries = [];
      querySnapshot.forEach((snapshot) => {
        entries.push(`${snapshot.id}:\n${snapshot.data().content}`);
      });
      document.getElementById("diary-content").value = entries.join("\n\n");
      return;
    }

    const snapshot = await getDoc(doc(db, userEmail, title));
    if (snapshot.exists()) {
      document.getElementById("diary-content").value = snapshot.data().content;
    } else {
      alert("No diary entry with that title was found.");
    }
  } catch (error) {
    console.error("Read failed:", error);
    alert("Unable to read diary entries.");
  }
};

const updateContent = async () => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) return;

  const { title, content } = getDiaryInput();
  if (!title) {
    alert("Please enter the title of the diary entry to update.");
    return;
  }

  try {
    await updateDoc(doc(db, userEmail, title), {
      timestamp: new Date(),
      title,
      content,
    });
    alert(`Updated: "${title}"`);
    clearDiaryInput();
  } catch (error) {
    console.error("Update failed:", error);
    alert("Unable to update the diary entry. Make sure it already exists.");
  }
};

const deleteContent = async () => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) return;

  const { title } = getDiaryInput();
  if (!title) {
    alert("Please enter the title of the diary entry to delete.");
    return;
  }

  try {
    await deleteDoc(doc(db, userEmail, title));
    alert(`Deleted: "${title}"`);
    clearDiaryInput();
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Unable to delete the diary entry.");
  }
};

window.addEventListener("load", start);
