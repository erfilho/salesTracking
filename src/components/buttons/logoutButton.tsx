import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../features/auth/authContext";

import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Falha ao fazer logout! ", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-col items-center cursor-pointer"
    >
      <FaSignOutAlt size={28} />
      Logout
    </button>
  );
};

export default LogoutButton;
