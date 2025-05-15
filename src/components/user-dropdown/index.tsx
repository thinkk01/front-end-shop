import React from "react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { DropdownUser } from "@/configs/layout";
import { useAuth } from "@/hooks/useAuth";

import IconifyIcon from "../Icon";

type TProps = {

}

const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation(); 
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();

  console.log(user);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Avatar sx={{ width: 32, height: 32 }} >
          {user?.avatar ? (
            <Image src={user?.avatar || ""} alt="avatar" width={100} height={100} style={{ width:"auto", height:"auto", objectFit: "cover" }}/>
          ): (
            <IconifyIcon icon="ph:user-thin" width="24" height="24" />
          )}
   
        </Avatar>
      </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
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
              <Link href="/my-profile">{t("my_profile")}</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="addAnotherAccount">Add Another Account</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
  </Box>
  );
};

export default UserDropDown;
