import { CircularProgress } from "@mui/material";

import { useAuth } from "../../auth/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  email: string;
  password: string;
  onError?: (error: string) => void;
  className?: string;
}

const LoginButton = ({
  email,
  password,
  onError,
  className,
}: LoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e?.preventDefault();

    if (!email || !password) {
      onError?.("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      console.error(`Login error! ${err}`);
      onError?.(getFriendlyError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const getFriendlyError = (error: unknown): string => {
    if (typeof error === "string") return error;
    if (error instanceof Error) {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email)":
          return "E-mail inválido";
        case "Firebase: Error (auth/user-not-found)":
        case "Firebase: Error (auth/wrong-password)":
          return "E-mail ou senha incorretos";
        case "Firebase: Error (auth/too-many-requests)":
          return "Muitas tentativas. Tente mais tarde";
        default:
          return "Erro ao fazer login";
      }
    }
    return "Erro desconhecido";
  };

  return (
    <button
      onClick={handleLogin}
      disabled={!email || !password || isLoading}
      className={`login-button ${className} ${isLoading ? "opacity-50" : ""}`}
      type="submit"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={20} color="inherit" />
        </div>
      ) : (
        "Entrar"
      )}
    </button>
  );
};

export default LoginButton;
