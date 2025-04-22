
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const user = localStorage.getItem("nutribite_user");
    setIsLoggedIn(!!user);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage
      const userData = { email, name: email.split('@')[0] };
      localStorage.setItem("nutribite_user", JSON.stringify(userData));
      
      setIsLoggedIn(true);
      toast.success("Login successful! Welcome back.");
      return true;
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage
      const userData = { email, name: `${firstName} ${lastName}` };
      localStorage.setItem("nutribite_user", JSON.stringify(userData));
      
      setIsLoggedIn(true);
      toast.success("Account created successfully! Welcome to NutriBite.");
      return true;
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("nutribite_user");
    localStorage.removeItem("user_profile");
    setIsLoggedIn(false);
    toast.success("You have been signed out successfully.");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
