import { useNavigate } from "react-router-dom";

import { FaHubspot, FaSignOutAlt, FaUserTag } from "react-icons/fa";
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
      url: "/about",
    },
    {
      label: <LogoutButton />,
      icon: <FaSignOutAlt size={28} />,
      url: "/contact",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full justify-center p-1 fixed bottom-0">
      <div className="flex flex-row rounded-xl justify-center bg-slate-400 p-2 gap-2 w-1/4">
        {menu.map((button) => (
          <button
            onClick={() => navigate(button.url)}
            className="flex flex-col items-center"
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashDock;
