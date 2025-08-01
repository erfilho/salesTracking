import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const auth = getAuth();

export interface userDoc {
  email: string;
  password: string;
  role: string;
}

export interface userDocData {
  uid: string;
  email: string;
  role: string;
  createdAt?: Date;
}

export const createUserWithRole = async (data: userDoc) => {
  try {
    // Criando o usuário primeiro
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    const userData = userCredentials.user;

    // A partir da criação do usuário, adicionando a tabela roles para a autenticação
    await setDoc(doc(db, "users", userData.uid), {
      email: userData.email,
      role: data.role,
      createdAt: new Date(),
    });

    return {
      sucess: true,
      userId: userData.uid,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersWithRoles = async (): Promise<
  userDocData[] | undefined
> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const fetchedUsers = querySnapshot.docs.map((doc) => ({
      uid: doc.id,
      email: doc.data().email,
      role: doc.data().role,
    }));

    return fetchedUsers;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get users!");
  }
};
