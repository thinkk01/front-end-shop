import * as React from "react";
import { NextPage } from "next";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";

const defaultTheme = createTheme();
type TProps = {
  children: React.ReactNode;
};
const UserLayout: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <VerticalLayout toggleDrawer={toggleDrawer} open={open} />
        <HorizontalLayout toggleDrawer={toggleDrawer} open={open} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container sx={{
            m: 4,
            backgroundColor: theme.palette.background.paper,
            width: "calc(100% - 32px)",
            maxWidth: "calc(100% - 55px) !important",
            overflow: "auto",
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            borderRadius: "15px",
            padding: "0 !important",

          }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default UserLayout;
