import { useNavigate } from "react-router-dom";

import {
  FaCartPlus,
  FaHubspot,
  FaRegUserCircle,
  FaUserTag,
} from "react-icons/fa";
import { useAuth } from "../../features/auth/authContext";
import LogoutButton from "../buttons/logoutButton";

function DashDock() {
  const menu = [
    {
      label: "Dashboard",
      icon: <FaHubspot size={28} />,
      url: "/",
      acess: "all",
    },
    {
      label: "Vendas",
      icon: <FaUserTag size={28} />,
      url: "/vendas",
      acess: "all",
    },

    // Admin buttons
    {
      label: "Nova venda",
      icon: <FaCartPlus size={28} />,
      url: "/admin/nova-venda",
      acess: "admin",
    },
    {
      label: "Usuários",
      icon: <FaRegUserCircle size={28} />,
      url: "/admin/usuarios",
      acess: "admin",
    },
  ];

  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 flex w-full flex-row justify-center p-1">
      <div className="flex min-w-1/4 flex-row justify-around gap-3 rounded-xl bg-slate-400 p-2">
        {menu.map((button) => (
          <button
            key={button.label}
            onClick={() => navigate(button.url)}
            className={
              button.acess == "admin" && !isAdmin
                ? `hidden`
                : `mx-1 flex cursor-pointer flex-col items-center`
            }
          >
            {button.icon}
            {button.label}
          </button>
        ))}
        <LogoutButton />
      </div>
    </div>
  );
}

export default DashDock;
