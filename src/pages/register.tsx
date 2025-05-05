
import { NextPage } from "next";
import Head from "next/head";

import LoginPage from "@/views/layouts/pages/login";
import RegisterPage from "@/views/layouts/pages/register";

type TProps = {

}
const Register: NextPage<TProps> = () => {
  return (
    <RegisterPage />
  );
};
export default Register;
