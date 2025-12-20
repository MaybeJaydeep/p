import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        PlacedPrep
      </h1>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-gray-700 dark:text-gray-300">
          Login
        </Link>
        <Link to="/register" className="text-gray-700 dark:text-gray-300">
          Register
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
