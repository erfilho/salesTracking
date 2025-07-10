import { auth, db } from "../firebase";
import { registerUser } from "./userAuthService";

import {
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  currentUser: User | null;
  userRole: "admin" | "viewer" | null;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ credential: UserCredential; role: "admin" | "viewer" }>;
  logoutUser: () => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    role: "admin" | "viewer"
  ) => Promise<UserCredential>;
  isAdmin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserData {
  email: string;
  role: "admin" | "viewer";
  createdAt: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "viewer" | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data()?.role || "viewer");
          } else {
            throw new Error("Documento do usuário não encontrado!");
          }
        } else {
          setUserRole(null);
        }
      } catch (err) {
        setUserRole(null);
        throw new Error(`Erro ao carregar o usuário! ${err}`);
      } finally {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ credential: UserCredential; role: "admin" | "viewer" }> => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

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

  const logoutUser = async (): Promise<void> => {
    try {
      await signOut(auth);

      setCurrentUser(null);
      setUserRole(null);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const value: AuthContextType = {
    currentUser,
    userRole,
    loginUser,
    logoutUser,
    registerUser,
    isAdmin: userRole === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with AuthProvider");
  }
  return context;
}
