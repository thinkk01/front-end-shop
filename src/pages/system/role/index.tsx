import { NextPage } from "next";
import { ReactNode } from "react";

import RegisterPage from "@/views/pages/register";
import BlankLayout from "@/views/layouts/BlankLayout";
import RoleListPage from "@/views/pages/system/role/RoleList";

type TProps = {};
const Index: NextPage<TProps> = () => {
  return <RoleListPage />;
};
export default Index;
