import { auth, db } from "../firebase.ts";
import { loginUser, registerUser } from "../services/firestoreService.ts";

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
  loginUser: (email: string, password: string) => Promise<UserCredential>;
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
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserRole(userDoc.data()?.role || "viewer");
      } else {
        setUserRole(null);
      }

      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userRole,
    loginUser,
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
