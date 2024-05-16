// import {CognitoUserPool} from 'amazon-cognitto-identity-js';

// const poolData = {
//     UserPoolID: process.env.REACT_APP_USER_POOL_ID,
//     ClientID: process.env.REACT_APP_CLIENT_ID,
// };

// export default new CognitoUserPool (poolData);

import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

// Define the type for the pool data
const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID as string,
    ClientId: process.env.REACT_APP_CLIENT_ID as string,
};

// Export the CognitoUserPool instance
const userPool = new CognitoUserPool(poolData);
export default userPool;

