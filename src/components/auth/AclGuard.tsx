import { ReactNode } from "react";

import { ACLObj } from "@/configs/acl";

interface AclGuardProps{
    children: ReactNode
    authGuard?:boolean
    guestGuard?:boolean
    aclAbilities:ACLObj
}
const AclGuard = (props: AclGuardProps) =>{
    const { aclAbilities,children,guestGuard = false,authGuard = true } = props;
    return <>
   {children} 
    </>;
};
export default AclGuard;