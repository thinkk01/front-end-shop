export default {
  meEndpoint: "/auth/me",
  loginEndpoint: "/jwt/login",
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "refreshToken", // logout | refreshToken
  userData: "userData",
  temporaryToken: "temporaryToken"
};
export const TEMPORARY_TOKEN = "temporaryToken";
