import { useState, type FormEvent } from "react";
import { useAuth } from "../../auth/AuthContext";

type UserRole = "admin" | "viewer";

export function AddUser() {
  const { registerUser, isAdmin } = useAuth();
  const [form, setForm] = useState<{
    email: string;
    password: string;
    role: UserRole;
  }>({ email: "", password: "", role: "viewer" });

  if (!isAdmin) return <div> Acesso negado! </div>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(form.email, form.password, form.role);
      alert("Usuário criado com sucesso!");
      setForm({ email: "", password: "", role: "viewer" });
    } catch (erro) {
      alert("Erro ao criar usuário!");
      console.error(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
        placeholder="Password"
        required
        minLength={8}
      />
      <select
        value={form.role}
        onChange={(e) => {
          setForm({ ...form, role: e.target.value as UserRole });
        }}
      >
        <option value="viewer"> Visualizador </option>
        <option value="admin"> Administrador </option>
      </select>
      <button type="submit"> Criar usuário </button>
    </form>
  );
}
