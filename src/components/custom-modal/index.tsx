import { Typography, Modal, Box, styled, ModalProps } from "@mui/material";
import React from "react";
interface TCustomModal extends ModalProps {
  handleClose: () => void;
}
const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
  zIndex: 1000,
}));
const CustomModal = (props: TCustomModal) => {
  const { children, open, handleClose } = props;
  return (
    <StyleModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ height: "100%", width: "100vw ", overflowY: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        <Box sx={{ margin: "40px 0" }}>{children}</Box>
        </Box>
      </Box>
    </StyleModal>
  );
};
export default CustomModal;
