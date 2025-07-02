import { CONFIG_API } from "@/configs/api";
import instanceAxios from "@/helper/axios";
import { TParamsGetRoles } from "@/types/role";

export const getAllRole = async (data: {params: TParamsGetRoles}) => {
    try {
        const res = await instanceAxios.get(CONFIG_API.ROLE.INDEX, data);
        return res.data;                        
    } catch ( error ) {
        return error;
    }
};