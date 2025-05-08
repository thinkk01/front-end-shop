import React from "react";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import { DropdownUser } from "@/configs/layout";
import { useAuth } from "@/hooks/useAuth";

import IconifyIcon from "../Icon";

type TProps = {

}

const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();
  // const handleClick = (path) => {
  //   handleClose();
  //   navigate(path); 
  // };
  console.log(user);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: 32, height: 32 }} >
          {user?.avatar ? (
            <Image src={user?.avatar || ""} alt="avatar" style={{ width:"auto", height:"auto" }}/>
          ): (
            <IconifyIcon icon="ph:user-thin" width="24" height="24" />
          )}
   
        </Avatar>
      </Button>
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
              <Link href="/profile">My Profile</Link>
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
