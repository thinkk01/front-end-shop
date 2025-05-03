import { ReactElement, ReactNode } from "react";

interface GuestGuardProps{
    children: ReactNode
    fallback: ReactElement | null
}
const GuestGuard = (props:GuestGuardProps) =>{
    const { children, fallback } = props;
    return <>{children}</>;
};
export default GuestGuard;
