import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900">
      <Link to="/" className="font-bold text-lg">
        PlacedPrep
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/upload">Upload JD</Link>
            <button
              onClick={logout}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
