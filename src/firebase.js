import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwJyqT4wbfvWtMwuCC-FPiRI_XksYxlA4",
  authDomain: "fir-auth-f906a.firebaseapp.com",
  projectId: "fir-auth-f906a",
  storageBucket: "fir-auth-f906a.appspot.com",
  messagingSenderId: "567622095838",
  appId: "1:567622095838:web:5603f177d4976bd9ca834f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
//const dbb = firebase.firestore();

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log(user);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        thumbnail: user.photoURL
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const update = async (name, photoURL) => {
  /*console.log(name);
  console.log(photoURL);
  const user = auth.currentUser;
  console.log(user);
  if(name) user.displayName = name;
  if(photoURL) user.photoURL = photoURL;*/
  try{
    const user = auth.currentUser;
    console.log(user);
    const ref = doc(db, 'users', user.uid);
    console.log(ref);
    await updateDoc(ref, {
      name: name,
      thumbnail: photoURL
    });
    alert("Password reset link sent!");
  }
  catch(err){
    console.error(err);
    alert(err.message);
  }
  /*const user = auth.currentUser;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  console.log(docs)*/

  
  //console.log(collection(db, 'users'))

  // Set the "capital" field of the city 'DC'
  /*return ref.update({
    displayName: name,
    photoURL: photoURL
  })
  .then(() => {
      console.log("Document successfully updated!");
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });*/
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  update,
  sendPasswordReset,
  logout,
};
