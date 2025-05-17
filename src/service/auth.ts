import axios from "axios";

import { CONFIG_API } from "@/configs/api";
import { LoginParams } from "@/contexts/types";
import instanceAxios from "@/helper/axios";
import { TChangePassword, TRegisterAuth } from "@/types/auth";

export const loginAuth = async ( data: LoginParams ) =>{
    const res = await axios.post(CONFIG_API.AUTH.INDEX, data);
    return res.data;
};
export const logoutAuth = async () => {
    try {
        const res = await instanceAxios.post(CONFIG_API.AUTH.LOGOUT);
        return res.data;
    } catch (error) {
        return null;
    }
};
export const registerAuth = async (data: TRegisterAuth) => {
    try {
        const res = await axios.post(CONFIG_API.AUTH.REGISTER,data);
        return res.data;                        
    } catch ( error ) {
        return error;
    }
};
export const getAuthMe = async () => {
    try {
        const res = await instanceAxios.get(CONFIG_API.AUTH.AUTHME);
        return res.data;                        
    } catch ( error ) {
        return error;
    }
};

export const updateAuthMe = async (data: TRegisterAuth) => {
    try {
        const res = await instanceAxios.put(CONFIG_API.AUTH.AUTHME,data);
        return res.data;                        
    } catch ( error ) {
        return error;
    }
};
export const changePasswordAuth = async (data: TChangePassword) => {
    try {
        const res = await instanceAxios.patch(CONFIG_API.AUTH.CHANGEPASWORD,data);
        return res.data;
    } catch (error) {
        return error;
    }
};