import { ReactNode } from "react";
import { useRouter } from "next/router";

import NotAuthorized from "@/pages/401";
import BlankLayout from "@/views/layouts/BlankLayout";
import { useAuth } from "@/hooks/useAuth";
import { ACLObj, AppAbility, buildAbilityFor } from "@/configs/acl";

import { AbilityContext } from "../acl/Can";
interface AclGuardProps{
    children: ReactNode
    authGuard?:boolean
    guestGuard?:boolean
    aclAbilities:ACLObj
}
const AclGuard = (props: AclGuardProps) =>{
    const { aclAbilities,children,guestGuard = false,authGuard = true } = props;
    let ability: AppAbility;
    const auth = useAuth();
    const permissionUser:any = auth.user?.role.permissions ?? [];
    console.log(permissionUser);
    const router = useRouter();
    if (auth.user && !ability) {
        ability = buildAbilityFor(permissionUser,aclAbilities.subject);
    }
    if ( guestGuard || router.route === "/500" || router.route === "/404" || !authGuard) {
        if (auth.user && ability) {
            return <AbilityContext.Provider value ={ability}>{children}</AbilityContext.Provider>;
        } else {
            return children;
        }
    }
    if (ability && auth.user && ability.can(aclAbilities.action,aclAbilities.subject)){
        return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
    }
    return <>
        <BlankLayout>
            <NotAuthorized />
        </BlankLayout>
    </>;
};
export default AclGuard;