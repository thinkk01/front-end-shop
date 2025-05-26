import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef, DataGridProps, GridValueGetterParams } from "@mui/x-data-grid";
import { styled, Box } from "@mui/material";

const StyleCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
   
}));
const CustomDataGrid = React.forwardRef((props: DataGridProps, ref: React.Ref<any>) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StyleCustomGrid
       {...props}
      />
    </Box>
  );
});
CustomDataGrid.displayName = "CustomDataGrid";
export default CustomDataGrid;
