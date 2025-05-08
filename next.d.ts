
import { NextComponentType, NextPageContext } from "next";
import { ReactElement, ReactNode } from "react";

import { ACLObj } from "@/configs/acl";

declare module "next" {
    export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
        acl?: ACLObj
        authGuard?: boolean
        guestGuard?: boolean
        setConfig?: () => void
        contentHeightFixed?: boolean
        getLayout?: (page: ReactElement) => ReactNode
    }
}