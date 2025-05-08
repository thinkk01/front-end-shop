import auth from "@/configs/auth";

export const setLocalUserData = (userData: string, accessToken:string, refreshToken:string) => {
    return {
        userData: window.localStorage.setItem(auth.userData,userData),
        accessToken: window.localStorage.setItem(auth.storageTokenKeyName,accessToken),
        refreshToken: window.localStorage.setItem(auth.onTokenExpiration,refreshToken),
    };
};
export const getLocalUserData = () => {
    return {
        userData: window.localStorage.getItem(auth.userData),
        accessToken: window.localStorage.getItem(auth.storageTokenKeyName),
        refreshToken: window.localStorage.getItem(auth.onTokenExpiration),
    };
};
export const removeLocalUserData = () => {
    return {
        userData: window.localStorage.removeItem(auth.userData),
        accessToken: window.localStorage.removeItem(auth.storageTokenKeyName),
        refreshToken: window.localStorage.removeItem(auth.onTokenExpiration),
    };
};

