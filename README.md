# Animal-recognition-system

install:
npm
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled

npm install amazon-cognito-identity-js

# Change user password

```
aws cognito-idp admin-set-user-password \
  --user-pool-id eu-west-1_g3jT3wSz8 \
  --username ewaryst.lawecki@gmail.com \
  --password zaq1@WSXcde3 \
  --permanent
```
