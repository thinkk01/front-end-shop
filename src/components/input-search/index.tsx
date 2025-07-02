import { alpha, IconButton, InputBase, Tooltip } from "@mui/material";
import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
import { t } from "i18next";

import IconifyIcon from "../Icon";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  height: "32px",
  border: `1px solid ${theme.palette.customColors?.borderColor}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const InputSearch = (props) => {
  return (
    <Search>
      <SearchIconWrapper>
        <IconifyIcon icon="material-symbols:search" />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
    </Search>
  );
};
export default InputSearch;
