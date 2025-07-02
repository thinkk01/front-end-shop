import { Box, MenuItem, Pagination, PaginationProps, Select, styled } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React, { Ref } from "react";
import { useTranslation } from "react-i18next";

type TPropCustomPagination = {
  page: number;
  pageSize: number;
  rowLength: number;
  pageSizeOptions?: number[];
  onchangePagination?: (page: number, pageSize: number) => void;
};
const StylePagination = styled(Pagination)<PaginationProps>(({ theme }) => ({
  "& .MuiDataGrid-footerContainer": {
    ".MuiBox-root" : {
        flex: 1,
        width: "100% !important",
    },
  },
  "& .MuiDataGrid-footerCell": {
    padding: "0 8px",
  },
}));
const Custompagination = React.forwardRef((props: TPropCustomPagination, ref: Ref<any>) => {
  const { page, pageSize, rowLength, pageSizeOptions, onchangePagination, ...rests } = props;
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <span>{t("Đang hiển thị")}</span>
        <span style={{ fontWeight: "bold" }}>
          {page === 1 ? page : 1 + pageSize}
          {" - "}
        </span>
        <span style={{ fontWeight: "bold" }}> {page * pageSize}</span>
        <span> {t("trên")}</span>
        <span style={{ fontWeight: "bold" }}> {rowLength}</span>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>{t("Số dòng hiển thị")}</span>
          <Select
            size="small"
            sx={{
              wwidth: "80px",
              padding: 0,
              "& . MuiSelect-select.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input": {
                minWidth: "unset !iportant",
                padding: "8.5px 12px 8.5px 24px !important",
              },
            }}
            value={pageSize}
            onChange={(e) => onchangePagination(1, +e.target.value)}
          >
            {pageSizeOptions?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <StylePagination color="primary" {...rests} />
      </Box>
    </Box>
  );
});
Custompagination.displayName = "Custompagination";
export default Custompagination;
