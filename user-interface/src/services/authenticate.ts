import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "../config/userpool";

export const authenticate = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const logout = () => {
  const user = userpool.getCurrentUser();
  if (user !== null) {
    user.signOut();
    window.location.href = "/";
  } else {
    console.warn("No user is currently signed in.");
  }
};
