import { useAuth } from "../../auth/AuthContext";

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

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
