import { useState, useEffect } from "react";

const useSessionCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/session", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log("hi");
          setIsAuthenticated(true); // Assuming the response is { authenticated: true }
        } else {
          console.log("dsdsd");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  return isAuthenticated;
};

export default useSessionCheck;
