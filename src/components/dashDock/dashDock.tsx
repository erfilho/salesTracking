import { useNavigate } from "react-router-dom";

import { FaHubspot, FaUserTag } from "react-icons/fa";
import LogoutButton from "../buttons/logoutButton";

function DashDock() {
  const menu = [
    {
      label: "Dashboard",
      icon: <FaHubspot size={28} />,
      url: "/",
    },
    {
      label: "Sales",
      icon: <FaUserTag size={28} />,
      url: "/vendas",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full justify-center p-1 fixed bottom-0">
      <div className="flex flex-row rounded-xl justify-center bg-slate-400 p-2 gap-2 w-1/4">
        {menu.map((button) => (
          <button
            key={button.label}
            onClick={() => navigate(button.url)}
            className="flex flex-col items-center cursor-pointer"
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
