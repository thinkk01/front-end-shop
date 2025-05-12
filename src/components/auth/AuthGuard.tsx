import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import auth from "@/configs/auth";
import { removeLocalUserData } from "@/helper/storage";
interface AuthGuardProps{
    children: ReactNode,
    fallback: ReactElement | null
}
const AuthGuard = (props: AuthGuardProps) =>{
    const { children, fallback } = props;
    const authContext = useAuth();
    const router = useRouter();
    useEffect(() =>{
        if (!router.isReady){
            return;
        }
        if (authContext.user === null 
            && !window.localStorage.getItem(auth.storageTokenKeyName) 
            && !window.localStorage.getItem(auth.userData)){
                // if access / or login without login auth => path url : returnURL after login : ?returnURL:/login => /
                if (router.asPath !== "/" && router.asPath !== "/login"){
                    router.replace({
                        pathname: "/login",
                        query: {
                            returnUrl: router.asPath
                        }
                    });
                } else {
                    router.replace("/login");
                }
            authContext.setUser(null);
            removeLocalUserData();
        }
    },[ router.route ]);
    if (authContext.loading || authContext.user === null ){
        return fallback;
    }
    return <>{ children }</>;
};
export default AuthGuard;