// ** MUI Imports
import { styled, useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "@mui/material";
import { ModalProps } from "@mui/material";
const CustomModal = styled(Modal)<ModalProps>(({ theme }) => ({
  "&.Mui-modal-root": {
    width: "100%",
    height: "100%",
    zIndex: 2000,
    ".MuiModal-backdrop": {
      backgroundColor: `rgba(${theme.palette.customColors.main},0.7)`,
    },
  },
}));
const Spinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook
  const theme = useTheme();

  return (
    <CustomModal open={true}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          ...sx,
        }}
      >
        <CircularProgress disableShrink sx={{ mt: 6 }} />
      </Box>
    </CustomModal>
  );
};

export default Spinner;
