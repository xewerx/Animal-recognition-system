import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";

console.log(process.env.REACT_APP_USER_POOL_ID);
// Define the type for the pool data
const poolData: ICognitoUserPoolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID as string,
  ClientId: process.env.REACT_APP_CLIENT_ID as string,
};

// Export the CognitoUserPool instance
const userPool = new CognitoUserPool(poolData);

export default userPool;
