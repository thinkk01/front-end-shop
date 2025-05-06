import axios from "axios";

import { CONFIG_API } from "@/configs/api";
import { LoginParams } from "@/contexts/types";

export const loginAuth = async ( data: LoginParams ) =>{
    try {
        const res = await axios.post(CONFIG_API.AUTH.INDEX, data);
        return res.data;
    } catch ( error ){
        return error;
    }
};