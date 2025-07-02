import React from "react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, styled, Tooltip } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "@mui/material";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

import { DropdownUser } from "@/configs/layout";
import { useAuth } from "@/hooks/useAuth";
import { CONFIG_API } from "@/configs/api";
import { ROUTE_CONFIG } from "@/configs/route";

import IconifyIcon from "../Icon";

type TProps = {};
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: "\"\"",
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlechagePassword = () => {
    router.push(ROUTE_CONFIG.CHANGE_PASSWORD);
  };
  return (
    <Box>
      <Tooltip title={t("Account")}>
        <IconButton
          id="basic-button"
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <Image
                  src={user?.avatar || ""}
                  alt="avatar"
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto", objectFit: "cover" }}
                />
              ) : (
                <IconifyIcon icon="ph:user-thin" />
              )}
            </Avatar>
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {!user ? (
          <>
            <MenuItem disabled>Please login my page</MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/login">Đăng nhập</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/register">Đăng ký</Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem disabled>{user.email}</MenuItem>
            <MenuItem onClick={handleClose}>
              <IconifyIcon icon="tdesign:system-location" /> 
              <Link href="/dashboard">{t("Manage System")}</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IconifyIcon icon="pajamas:profile" width={24} height={24} /> {" "}
              <Link href="/my-profile">{t("my_profile")}</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handlechagePassword();
              }}
            >
              <IconifyIcon icon="carbon:password" />
              {t("Change Password")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              <IconifyIcon icon="material-symbols-light:logout" />
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default UserDropDown;
