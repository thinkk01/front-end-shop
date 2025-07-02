import * as React from "react";
import {
  DataGrid,
  DataGridProps,
} from "@mui/x-data-grid";
import { styled, Box } from "@mui/material";

const StyleCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  ".MuiDataGrid-withBorderColor": {
    outline: "none",
  },
  "MuidataGrid-selectedRowCount": {
    display: "none",
  },
}));
const CustomDataGrid = React.forwardRef((props: DataGridProps, ref: React.Ref<any>) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StyleCustomGrid {...props} />
    </Box>
  );
});
CustomDataGrid.displayName = "CustomDataGrid";
export default CustomDataGrid;
