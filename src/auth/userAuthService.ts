import { auth, db } from "../firebase.ts";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { doc, DocumentReference, getDoc, setDoc } from "firebase/firestore";

interface UserData {
  email: string;
  role: "admin" | "viewer";
  createdAt: Date;
}

// Function for user register ( only admin have acess )
const registerUser = async (
  email: string,
  password: string,
  role: "admin" | "viewer"
): Promise<UserCredential> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const userDoc: DocumentReference = doc(db, "users", userCredential.user.uid);

  await setDoc(userDoc, {
    email,
    role,
    createdAt: new Date(),
  } as UserData);

  return userCredential;
};

// Login function
const loginUser = async (
  email: string,
  password: string
): Promise<{ credential: UserCredential; role: "admin" | "viewer" }> => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const userDoc = await getDoc(doc(db, "users", credential.user.uid));

    if (!userDoc.exists()) {
      await signOut(auth);
      throw new Error("User document not found!");
    }

    const userData = userDoc.data() as UserData;

    if (!["admin", "viewer"].includes(userData.role)) {
      throw new Error("Invalid user role!");
    }

    return {
      credential,
      role: userData.role,
    };
  } catch (err) {
    console.error("Login error!");
    if (err instanceof Error) {
      if (err.message.includes("auth/invalid-credential")) {
        throw new Error("Credenciais inválidas");
      }
      if (err.message.includes("auth/too-many-requests")) {
        throw new Error("Acesso temporariamente bloqueado. Tente mais tarde");
      }
    }

    throw err;
  }
};

// Logout function
const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(`Error while logout! ${err}`);
  }
};

export { loginUser, logoutUser, registerUser };
