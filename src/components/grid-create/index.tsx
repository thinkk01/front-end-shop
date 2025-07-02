import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
import { t } from "i18next";

import IconifyIcon from "../Icon";

interface TGridCreate {
  onClick: () => void;
  disable?: boolean;
}
const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({

}));
const GridCreate = (props: TGridCreate) => {
  const { onClick, disable } = props;
  const theme = useTheme();
  return (
   <Tooltip title={t("Delete")}>
      <IconButton onClick={onClick} disabled={disable} sx={{ color: theme.palette.primary.main }}>
        <IconifyIcon icon="ic:baseline-plus" width="24" height="24" />
      </IconButton>
   </Tooltip>
  );
};
export default GridCreate;
