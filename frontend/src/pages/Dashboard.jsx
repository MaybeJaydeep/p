import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
