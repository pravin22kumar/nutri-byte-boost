
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const user = localStorage.getItem("nutribite_user");
    setIsLoggedIn(!!user);
    setIsLoading(false);
  }, []);

  return { isLoggedIn, isLoading };
};
