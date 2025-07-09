import { auth, db } from "../firebase";
import { loginUser, registerUser } from "./userAuthService";

import { type User, type UserCredential } from "firebase/auth";
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
  loginUser: (email: string, password: string) => Promise<{credential: UserCredential, role: 'admin' | 'viewer'}>;
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

  const logoutUser = async () => {
    try {
      await logoutUser();
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
