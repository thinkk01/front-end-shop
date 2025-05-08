import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import { removeLocalUserData } from "@/helper/storage";
import auth from "@/configs/auth";
import { useAuth } from "@/hooks/useAuth";

interface GuestGuardProps{
    children: ReactNode
    fallback: ReactElement | null
}
const GuestGuard = (props:GuestGuardProps) =>{
    const { children, fallback } = props;
        const authContext = useAuth();
        const router = useRouter();
        useEffect(() =>{
            if (!router.isReady){
                return;
            }
            if ( window.localStorage.getItem(auth.storageTokenKeyName) 
                && window.localStorage.getItem(auth.userData)){
                router.replace("/");
            }
        },[router.route]);
        if ( authContext.loading || (!authContext.loading && !authContext.user !== null )) return fallback; 
    return <>{children}</>;
};
export default GuestGuard;
