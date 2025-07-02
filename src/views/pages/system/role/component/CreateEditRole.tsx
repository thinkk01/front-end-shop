import { IconButton, Tooltip } from "@mui/material";
import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
import { t } from "i18next";

import IconifyIcon from "@/components/Icon";
import CustomModal from "@/components/custom-modal";

interface TCreateEditRole {
    open: boolean;
    handleClose: () => void;
    idRole?: string;
}
const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({

}));
const CreateEditRole = (props: TCreateEditRole) => {
    const { open, handleClose, idRole } = props;
  return (
      <CustomModal open={open} handleClose={handleClose}>
        <Box sx={{ backgroundColor: "white", padding: "16px", borderRadius: "8px" }}>
            <div>Create</div>
        </Box>
      </CustomModal>
  );
};
export default CreateEditRole;
