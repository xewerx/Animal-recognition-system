import {CognitoUserPool} from 'amazon-cognitto-identity-js';

const poolData = {
    UserPoolID: process.env.REACT_APP_USER_POOL_ID,
    ClientID: process.env.REACT_APP_CLIENT_ID,
};

export default new CognitoUserPool (poolData);
