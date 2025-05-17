export const BASE_URL = process.env.NEXT_PUBLIC_APP_HOST;
export const CONFIG_API = {
    AUTH: {
        INDEX: `${BASE_URL}/auth/login`,
        AUTHME: `${BASE_URL}/auth/me`,
        LOGOUT: `${BASE_URL}/auth/logout`,
        REGISTER: `${BASE_URL}/auth/register`,
        CHANGEPASWORD: `${BASE_URL}/auth/change-password`,
    }
};