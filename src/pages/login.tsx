
import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";

import LoginPage from "@/views/layouts/pages/login";
import BlankLayout from "@/views/layouts/BlankLayout";

type TProps = {

}
const Login: NextPage<TProps> = () => {
  return (
    <LoginPage/>
  );
};
export default Login;

Login.getLayout = (page: ReactNode) => <BlankLayout>{ page }</BlankLayout>;
