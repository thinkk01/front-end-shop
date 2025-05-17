import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { FC } from "react";
import { NextRouter, useRouter } from "next/router";

import { BASE_URL, CONFIG_API } from "@/configs/api";
import { UserDataType } from "@/contexts/types";
import { useAuth } from "@/hooks/useAuth";

import { getLocalUserData, getTemporaryToken, removeLocalUserData, removeTemporaryToken, setLocalUserData } from "../storage";

type TAxiosInterceptor = {
    children: React.ReactNode
}
const handleRedirectLogin = (router: NextRouter,setUser: (data:UserDataType | null) => void) => {
    if (router.asPath !== "/"){
        router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath }
        });
    } else {
        router.replace("/login");
    }
    setUser(null);
    removeLocalUserData();
    removeTemporaryToken();
};
const instanceAxios = axios.create({ baseURL: BASE_URL });
const AxiosInterceptor:FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter();
    const { setUser } = useAuth();
    instanceAxios.interceptors.request.use( async config => {
        const { accessToken, refreshToken } = getLocalUserData(); 
        const { temporaryToken } = getTemporaryToken();
        if (accessToken || temporaryToken) {    
            let decodeAccessToken: any = {};
            if (accessToken) {
                decodeAccessToken = jwtDecode(accessToken);
            } else if (temporaryToken) {
                decodeAccessToken = jwtDecode(temporaryToken);
            }
            if ( decodeAccessToken?.exp > Date.now() /1000 ){   
                config.headers["Authorization"] = `Bearer ${accessToken ? accessToken : temporaryToken}`;
            } else {
                if (refreshToken) {
                    const decodeRefreshToken: any = jwtDecode(refreshToken);
                    if (decodeRefreshToken?.exp > Date.now()/1000){
                        await axios.post(`${BASE_URL}/refresh-token`, {}, {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        }).then ((res) =>{
                            const newAccessToken = res?.data?.data?.access_token;
                            if (newAccessToken) {
                                config.headers["Authorization"] = `Bearer ${newAccessToken}`; 
                            } else {
                                handleRedirectLogin(router,setUser);
                            }
                        }).catch (error => {
                            handleRedirectLogin(router,setUser);
                        });
                    } else {
                    handleRedirectLogin(router, setUser);
                    }
                } else {
                    handleRedirectLogin(router, setUser);
                }
            }
        } else {
            handleRedirectLogin(router, setUser);
        }
        return config;
    }); 
    instanceAxios.interceptors.response.use(response => {
        // console.log( response );
        return response;
    });
    return <> { children } </>;
};

export default instanceAxios;
export { AxiosInterceptor };