import { NextPage } from "next";
import * as React from "react";
import { Box, Container, CssBaseline, Toolbar, useTheme } from "@mui/material";

import HorizontalLayout from "./HorizontalLayout";

type TProps = {
  children: React.ReactNode,
}

const LayoutNotApp: NextPage<TProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
        <CssBaseline/>
        <HorizontalLayout toggleDrawer={() => {}} open={open} isHideMenu></HorizontalLayout>
        <Box component="main"
        sx={{ backgroundColor: theme => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: "100vh", overflow:"auto" }}>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, 
              backgroundColor: theme.palette.background.paper, 
              width: "calc(100vw - 32px)", 
              maxWidth:"unset !important", 
              overflow:"auto", 
              maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`, 
              borderRadius: "15px" }}>
                {children}
            </Container>
        </Box>
    </Box>
    );
};
export default LayoutNotApp;