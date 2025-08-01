import { useState } from "react";

import { FaGoogle } from "react-icons/fa";

import LoginButton from "../../components/buttons/loginButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  };

  const googleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="flex h-dvh min-h-full min-w-full flex-row items-center justify-center gap-2 bg-slate-100 align-middle">
      <div className="flex h-3/4 w-full items-center justify-center lg:h-full lg:w-1/2">
        <div className="flex h-full w-full flex-col justify-around bg-slate-500 p-10 text-white shadow-2xl lg:h-3/4 lg:w-3/4 lg:rounded-3xl xl:w-3/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          dolorum! Esse minima animi voluptatibus id modi a numquam cupiditate
          culpa, magnam nesciunt! Perferendis numquam, obcaecati inventore
          molestiae unde ipsam modi.
        </div>
      </div>

      <div className="flex h-3/4 w-full items-center justify-center lg:h-full lg:w-1/2">
        <div className="flex h-full w-full flex-col justify-around bg-slate-500 p-10 text-white shadow-2xl lg:h-3/4 lg:w-3/4 lg:rounded-3xl xl:w-3/5">
          <div className="">
            <h2 className="text-center text-xl font-medium">SalesTracking</h2>
            <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
          </div>

          {/* Mensagem de erro */}
          {error && <div className="error-message">{error}</div>}

          {/* Formulário de login */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-3/4 rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-3/4 rounded-lg bg-slate-400 px-4 py-2 placeholder-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LoginButton
              email={email}
              password={password}
              onError={setError}
              className="w-1/3 cursor-pointer rounded-lg bg-slate-300 py-2 font-bold text-slate-900 transition hover:bg-slate-200"
            />
          </form>

          {/* Divisor */}
          <div className="my-6 w-4/5 self-center border-t border-white opacity-50"></div>

          {/* Botões de login */}
          <button
            onClick={googleLogin}
            className="flex cursor-pointer items-center justify-center gap-2 self-center rounded-full bg-white py-2 font-medium text-black transition hover:bg-gray-200 sm:w-3/4 md:w-2/4 xl:w-1/2"
          >
            <FaGoogle className="text-xl" />
            Login com Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
