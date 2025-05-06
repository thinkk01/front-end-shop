import { ACLObj } from "@/configs/acl";
import { NextComponentType, NextPageContext } from "next";
import { ReactElement } from "react";

declare module 'next' {
    export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
        acl?: ACLObj
        authGuard?: boolean
        guestGuard?: boolean
        setConfig?: () => void
        contentHeightFixed?: boolean
        getLayout?: (page: ReactElement) => ReactNode
    }
}