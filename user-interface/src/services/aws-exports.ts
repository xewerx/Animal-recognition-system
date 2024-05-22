export const awsConfig = {
    Auth: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID,
      region: process.env.REACT_APP_AWS_REGION,
    },
  };
  