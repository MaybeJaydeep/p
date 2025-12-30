import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Briefcase, Upload, LogOut, LogIn, UserPlus, Home } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { useToast } from "./ui/toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { success: showSuccess } = useToast();

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <Briefcase className="h-5 w-5" />
          <span>PlacedPrep</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="hidden sm:flex"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/upload")}
              >
                <Upload className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Upload JD</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
              <Button
                onClick={() => navigate("/register")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Register</span>
              </Button>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
