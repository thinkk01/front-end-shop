import React from "react";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { BoxProps, styled } from "@mui/system";
import { Typography } from "@mui/material";
import { Popover } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { LANGUAGE_OPTIONS } from "@/configs/i18n";

import IconifyIcon from "../Icon";

type TProps = {
    
};
interface TStyleProps extends BoxProps {
    selected: boolean
}
const StyledItemLanguage = styled(Box)<TStyleProps>(({ theme, selected }) => {
    console.log("selected" ,selected);
    return {
        cursor: "pointer",
        ".MuiTypography-root": {
            padding: "8px 12px",
            fontWeight: selected ? "bold" : "normal",
            backgroundColor: selected ? "#999" : "",
        },
        "&:hover": {
            backgroundColor: "#999"
        }
    };
});
const LanguageDropDown = (props: TProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const { i18n } = useTranslation();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleChangeLanguage = (lang:string) =>{ 
        i18n.changeLanguage(lang);
        handleClose();
    };
  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <IconifyIcon icon="material-symbols:translate" width="24" height="24" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",   
          horizontal: "left",
        }}
      >
        {
            LANGUAGE_OPTIONS.map((item,_index) => (
            <StyledItemLanguage selected={item.value === i18n.language} key={_index}><Typography sx={{ p: 2 }} onClick={() => handleChangeLanguage(item.value)}>
                {item.lang}
            </Typography></StyledItemLanguage>
            ))
        }
      </Popover>
    </>
  );
};

export default LanguageDropDown;
