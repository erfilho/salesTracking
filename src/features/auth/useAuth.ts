import { auth, db } from "../../firebase/config.ts";

import {
  createUserWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import { doc, DocumentReference, setDoc } from "firebase/firestore";

interface UserData {
  email: string;
  role: "admin" | "viewer";
  createdAt: Date;
}

// Function for user register ( only admin have acess )
const registerUser = async (
  email: string,
  password: string,
  role: "admin" | "viewer",
): Promise<UserCredential> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const userDoc: DocumentReference = doc(db, "users", userCredential.user.uid);

  await setDoc(userDoc, {
    email,
    role,
    createdAt: new Date(),
  } as UserData);

  return userCredential;
};

export { registerUser };
