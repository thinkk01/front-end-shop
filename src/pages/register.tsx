import { NextPage } from "next";
import { ReactNode } from "react";

import RegisterPage from "@/views/layouts/pages/register";
import BlankLayout from "@/views/layouts/BlankLayout";

type TProps = {

}
const Register: NextPage<TProps> = () => {
  return (
    <RegisterPage />
  );
};
export default Register;

Register.getLayout = (page: ReactNode) => <BlankLayout>{ page }</BlankLayout>;