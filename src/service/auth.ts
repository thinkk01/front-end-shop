import axios from "axios";

import { CONFIG_API } from "@/configs/api";
import { LoginParams } from "@/contexts/types";
import instanceAxios from "@/helper/axios";

export const loginAuth = async ( data: LoginParams ) =>{
    try {
        const res = await instanceAxios.post(CONFIG_API.AUTH.INDEX, data);
        return res.data;
    } catch ( error ){
        return error;
    }
};
export const logoutAuth = async () => {
    try {
        const res = await instanceAxios.post(CONFIG_API.AUTH.LOGOUT);
        return res.data;
    } catch (error) {
        return null;
    }
};