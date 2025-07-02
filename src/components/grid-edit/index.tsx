import { IconButton, Tooltip } from "@mui/material";
import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
import { t } from "i18next";

import IconifyIcon from "../Icon";

interface TGridEdit {

}
const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({

}));
const GridEdit = (props: TGridEdit) => {
  return (
   <Tooltip title={t("Edit")}>
      <IconButton>
        <IconifyIcon icon="mingcute:edit-line" width="24" height="24" />
      </IconButton>
   </Tooltip>
  );
};
export default GridEdit;
