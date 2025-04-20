
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
}

export const Header = ({ isLoggedIn }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("nutribite_user");
    localStorage.removeItem("user_profile");
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-nutribite-green">
                Nutri<span className="text-nutribite-orange">Bite</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-nutribite-green transition-colors">
              Home
            </Link>
            <Link to="/meal-planner" className="text-gray-700 hover:text-nutribite-green transition-colors">
              {isLoggedIn ? "Dashboard" : "Meal Planner"}
            </Link>
            <Link to="/chatbot" className="text-gray-700 hover:text-nutribite-green transition-colors">
              Nutrition Assistant
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-nutribite-green transition-colors">
              Shop
            </Link>
            <Link to="/education" className="text-gray-700 hover:text-nutribite-green transition-colors">
              Education
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="border-nutribite-green text-nutribite-green hover:bg-nutribite-green hover:text-white"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-nutribite-green text-nutribite-green hover:bg-nutribite-green hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button className="bg-nutribite-green hover:bg-nutribite-green-dark">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-nutribite-green hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/meal-planner" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-nutribite-green hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {isLoggedIn ? "Dashboard" : "Meal Planner"}
            </Link>
            <Link 
              to="/chatbot" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-nutribite-green hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Nutrition Assistant
            </Link>
            <Link 
              to="/shop" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-nutribite-green hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/education" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-nutribite-green hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {isLoggedIn ? (
                <div className="flex-shrink-0 w-full">
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full block text-center px-4 py-2 font-medium text-nutribite-green border border-nutribite-green rounded-md hover:bg-nutribite-green hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-shrink-0">
                    <Link 
                      to="/auth" 
                      className="w-full block text-center px-4 py-2 font-medium text-nutribite-green border border-nutribite-green rounded-md hover:bg-nutribite-green hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                  <div className="ml-3 w-full">
                    <Link 
                      to="/auth?signup=true" 
                      className="w-full block text-center px-4 py-2 font-medium text-white bg-nutribite-green rounded-md hover:bg-nutribite-green-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
