import { CognitoUserSession } from "amazon-cognito-identity-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userPool from "../config/userpool";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = userPool.getCurrentUser();

    if (user) {
      user.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err || !session) {
            navigate("/login");
          } else {
            setToken(session.getIdToken().getJwtToken());
            setIsAuthenticated(true);
          }
        }
      );
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate("/login");
  };

  return {
    isAuthenticated,
    token,
    handleLogout,
  };
};
