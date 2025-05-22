import { NextPage } from "next";
import { ReactNode } from "react";

import RegisterPage from "@/views/pages/register";
import BlankLayout from "@/views/layouts/BlankLayout";

type TProps = {

}
const ManageSystem: NextPage<TProps> = () => {
  return (
    <RegisterPage />
  );
};
export default ManageSystem;
