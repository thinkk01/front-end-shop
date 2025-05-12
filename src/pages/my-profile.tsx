import { NextPage } from "next";
import { ReactNode } from "react";

import MyProfilePage from "@/views/pages/my-profile";
import LayoutNotApp from "@/views/layouts/LayoutNotApp";

type TProps = {

}
const Index: NextPage<TProps> = () => {
  return (
    <MyProfilePage/>
  );
};
export default Index;

Index.getLayout = (page: ReactNode) => <LayoutNotApp>{ page }</LayoutNotApp>;