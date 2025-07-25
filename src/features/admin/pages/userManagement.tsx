import { useEffect, useState } from "react";
import DashDock from "../../../components/dashDock/dashDock";
import {
  getUsersWithRoles,
  type userDocData,
} from "../../../services/admin/firebaseAdministrative";
import { useAuth } from "../../auth/authContext";

function UserManagement() {
  const { userRole } = useAuth();

  const [users, setUsers] = useState<userDocData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userRole) return;

      try {
        const data = await getUsersWithRoles();

        setUsers(data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userRole]);
  return (
    <div>
      {users.map((doc) => {
        return (
          <div key={doc.uid}>
            <h2>{doc.email}</h2>
            <p>{doc.role}</p>
          </div>
        );
      })}
      User Management page
      <DashDock />
    </div>
  );
}
export default UserManagement;
