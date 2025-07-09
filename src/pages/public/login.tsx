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
  }

  const googleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="flex flex-row items-center align-middle justify-center gap-2 bg-slate-100 min-h-full h-dvh min-w-full">
      <div className="lg:w-1/2 w-full lg:h-full h-3/4 flex items-center justify-center">
        <div className="lg:w-3/4 xl:w-3/5 w-full lg:h-3/4 h-full bg-slate-500 text-white p-10 lg:rounded-3xl flex flex-col justify-around shadow-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          dolorum! Esse minima animi voluptatibus id modi a numquam cupiditate
          culpa, magnam nesciunt! Perferendis numquam, obcaecati inventore
          molestiae unde ipsam modi.
        </div>
      </div>

      <div className="lg:w-1/2 w-full lg:h-full h-3/4 flex items-center justify-center">
        <div className="lg:w-3/4 xl:w-3/5 w-full lg:h-3/4 h-full bg-slate-500 text-white p-10 lg:rounded-3xl flex flex-col justify-around shadow-2xl">
          <div className="">
            <h2 className="text-xl font-medium text-center">SalesTracking</h2>
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          </div>

          {/* Mensagem de erro */}
          {error && <div className="error-message">{error}</div>}

          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-lg bg-slate-400 w-3/4 placeholder-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="px-4 py-2 rounded-lg bg-slate-400 w-3/4 placeholder-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LoginButton
              email={email}
              password={password}
              onError={setError}
              className="bg-slate-300 cursor-pointer text-slate-900 py-2 rounded-lg font-bold hover:bg-slate-200 transition w-1/3"
            />
          </form>

          {/* Divisor */}
          <div className="my-6 border-t w-4/5 self-center border-white opacity-50"></div>

          {/* Botões de login */}
          <button
            onClick={googleLogin}
            className="flex items-center justify-center gap-2 cursor-pointer bg-white text-black py-2 rounded-full self-center font-medium hover:bg-gray-200 xl:w-1/2 md:w-2/4 sm:w-3/4 transition"
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
