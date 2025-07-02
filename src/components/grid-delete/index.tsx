import { IconButton, Tooltip } from "@mui/material";
import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
import { t } from "i18next";

import IconifyIcon from "../Icon";

interface TGridDelete {

}
const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({

}));
const GridDelete = (props: TGridDelete) => {
  return (
   <Tooltip title={t("Delete")}>
      <IconButton>
        <IconifyIcon icon="material-symbols:delete-outline" width="24" height="24" />
      </IconButton>
   </Tooltip>
  );
};
export default GridDelete;
