import auth, { TEMPORARY_TOKEN } from "@/configs/auth";

export const setLocalUserData = (userData: string, accessToken:string, refreshToken:string) => {
    return {
        userData: window.localStorage.setItem(auth.userData,userData),
        accessToken: window.localStorage.setItem(auth.storageTokenKeyName,accessToken),
        refreshToken: window.localStorage.setItem(auth.onTokenExpiration,refreshToken),
    };
};
export const getLocalUserData = () => {
    if (typeof window !== "undefined") {
        return {
            userData: window.localStorage.getItem(auth.userData),
            accessToken: window.localStorage.getItem(auth.storageTokenKeyName),
            refreshToken: window.localStorage.getItem(auth.onTokenExpiration),
        };
    }
    return {
        userData: "",
        accessToken: "",
        refreshToken: "",
    };
};
export const removeLocalUserData = () => {
    if (typeof window !== "undefined") {
    return {
        userData: window.localStorage.removeItem(auth.userData),
        accessToken: window.localStorage.removeItem(auth.storageTokenKeyName),
        refreshToken: window.localStorage.removeItem(auth.onTokenExpiration),
    };
}
return {
    userData: "",
    accessToken: "",
    refreshToken: "",
};
};
export const setTemporaryToken = (accessToken:string) => {
    return {
        userData: window.localStorage.setItem(TEMPORARY_TOKEN,accessToken),
    };
};
export const getTemporaryToken = () => {
    if (typeof window !== "undefined") {
        return {
            temporaryToken: window.localStorage.getItem(TEMPORARY_TOKEN),
        };
    }
    return {
        temporaryToken: "",
    };
};
export const removeTemporaryToken = () => {
    if (typeof window !== "undefined") {
    return {
        temporaryToken: window.localStorage.removeItem(TEMPORARY_TOKEN),
    };
}
    return {
        userData: "",
        accessToken: "",
        refreshToken: "",
    };
};
