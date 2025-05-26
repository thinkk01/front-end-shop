import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";
import { NextPage } from "next";
import * as React from "react";
type TProps = {
  children: React.ReactNode;
};
const BlankLayoutWrpper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",
}));
const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrpper>
      <Box sx={{ overflow: "hidden", minHeight: "100vh" }}>{children}</Box>
    </BlankLayoutWrpper>
  );
};
export default BlankLayout;
