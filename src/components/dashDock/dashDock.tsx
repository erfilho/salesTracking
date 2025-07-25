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
    <div className="flex flex-row w-full justify-center p-1 fixed bottom-0">
      <div className="flex flex-row rounded-xl justify-around bg-slate-400 p-2 gap-3 min-w-1/4">
        {menu.map((button) => (
          <button
            key={button.label}
            onClick={() => navigate(button.url)}
            className={
              button.acess == "admin" && !isAdmin
                ? `hidden`
                : `flex flex-col items-center cursor-pointer mx-1`
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
