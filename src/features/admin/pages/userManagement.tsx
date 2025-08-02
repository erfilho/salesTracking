import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaUserEdit, FaUsersCog } from "react-icons/fa";
import DashDock from "../../../components/dashDock/dashDock";
import Header from "../../../components/header";
import {
  getUsersWithRoles,
  type userDocData,
} from "../../../services/admin/firebaseAdministrative";
import { useAuth } from "../../auth/authContext";
import { AddUser } from "../components/AddUser";

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
    <div className="flex h-full w-full flex-col items-center justify-start gap-2 bg-gray-300">
      <Header title={`Usuários`} icon={<FaUsersCog size={28} />} />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-3/5 w-full max-w-4xl flex-col justify-between rounded-2xl bg-gray-400 p-6 shadow-xl backdrop-blur-md">
          <div className="flex w-full flex-col gap-2">
            <ul className="w-full space-y-3 place-self-start self-start justify-self-start text-sm text-white sm:text-base">
              <li className="flex h-3/4 w-full flex-row items-center justify-between pb-2">
                <h2 className="mb-4 w-3/4 text-xl font-bold text-black">
                  Lista de usuários
                </h2>

                <button className="bg-purple-1 hover:bg-purple-2 h-full w-1/5 cursor-pointer rounded-md">
                  {" "}
                  Adicionar usuário{" "}
                </button>
              </li>
            </ul>
            <ul className="w-full space-y-3 place-self-start self-start justify-self-start text-sm text-white sm:text-base">
              <li className="flex w-full flex-row justify-between border-b border-white/10 pb-2">
                <span className="text-dark-1 w-2/6 font-semibold">Email</span>
                <span className="text-dark-1 w-2/6 font-semibold">Nome</span>
                <span className="text-dark-1 w-1/6 font-semibold">Tipo</span>
                <span className="text-dark-1 w-1/6 font-semibold">Ação</span>
              </li>
              {users.map((doc) => {
                return (
                  <li
                    key={doc.uid}
                    className="flex w-full justify-between border-b border-white/10 pb-2"
                  >
                    <span className="w-2/6 text-start"> {doc.email} </span>
                    <span className="w-2/6 text-start">Nome</span>
                    <span className="w-1/6 text-start"> {doc.role} </span>
                    <span className="flex w-1/6 flex-row items-center justify-start gap-4 text-start">
                      <button className="cursor-pointer">
                        <FaUserEdit size={20} />
                      </button>
                      <button className="cursor-pointer">
                        <FaRegTrashAlt size={20} />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <AddUser />
      </div>
      <DashDock />
    </div>
  );
}
export default UserManagement;
