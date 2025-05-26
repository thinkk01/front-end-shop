import { NextPage } from "next";
import { ReactNode } from "react";

import MyProfilePage from "@/views/pages/my-profile";
import LayoutNotApp from "@/views/layouts/LayoutNotApp";
import ChangePasswordPage from "@/views/pages/change-password";

type TProps = {};
const ChangePassword: NextPage<TProps> = () => {
  return <ChangePasswordPage />;
};
export default ChangePassword;

ChangePassword.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>;
