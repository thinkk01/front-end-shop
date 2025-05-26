import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

import IconifyIcon from "@/components/Icon";
import UserDropDown from "@/components/user-dropdown";
import ModeToggle from "@/components/mode-toggle";
import LanguageDropDown from "@/components/language-dropdown";
import { ROUTE_CONFIG } from "@/configs/route";
import { useAuth } from "@/hooks/useAuth";
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background:
    theme.palette.mode === "light"
      ? theme.palette.customColors?.lightPaperBg
      : theme.palette.customColors?.darkPaperBg,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
type TProps = {
  open: boolean;
  toggleDrawer: () => void;
  isHideMenu?: boolean;
};
const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          { !open && (
            <IconifyIcon icon="material-symbols:menu" color="black" />
          )}
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <IconifyIcon icon="tdesign:notification-filled" width="24" height="24" />
          </Badge>
        </IconButton>
        <ModeToggle />
        {user ? (
          <UserDropDown />
        ) : (
          <Button sx={{ ml: 2, width: "auto" }} onClick={() => router.push(ROUTE_CONFIG.LOGIN)}>
            Login
          </Button>
        )}
        <LanguageDropDown />
      </Toolbar>
    </AppBar>
  );
};
export default HorizontalLayout;
