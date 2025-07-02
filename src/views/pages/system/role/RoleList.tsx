"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { getAllRolesAsync } from "@/stores/role/actions";
import { UserDataType } from "@/contexts/types";
import { AppDispatch, RootState } from "@/stores";
import CustomDataGrid from "@/components/custom-data-grid";
import { PAGE_SIZE_OPTION } from "@/configs/gridConfig";
import Custompagination from "@/components/custom-pagination";
import IconifyIcon from "@/components/Icon";
import GridEdit from "@/components/grid-edit";
import GridDelete from "@/components/grid-delete";
import GridCreate from "@/components/grid-create";
import InputSearch from "@/components/input-search";

import CreateEditRole from "./component/CreateEditRole";

type TProps = {};

const RoleListPage: NextPage<TProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { roles } = useSelector((state: RootState) => state.role);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0]);
  const [openCreateEditRole, setOpenCreateEditRole] = useState({
    open: false,
    id: "",
  });
  const { t } = useTranslation();
  const handleGetListRole = () => {
    dispatch(getAllRolesAsync({ params: { limit: 10, page: 1 } }));
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t("Name"),
      width: 150,
    },
    {
      field: "action",
      headerName: t("Action"),
      width: 150,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: () => {
        return (
          <Box>
            <GridEdit />
            <GridDelete />
          </Box>
        );
      },
    },
  ];
  const PaginationComponent = () => {
    return <Custompagination pageSize={pageSize} page={page} rowLength={roles.total} />;
  };
  const onHandleClose = () => {
    setOpenCreateEditRole({ open: false, id: "" });
  };
  useEffect(() => {
    handleGetListRole();
  }, []);
  return (
    <>
    <CreateEditRole open={openCreateEditRole.open} handleClose={onHandleClose} idRole={openCreateEditRole.id}/>
      <Box>
        <Grid container>
          <Grid size={{ md: 5, xs: 12 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
            >
              <Box sx={{ width: "200px" }}>
                <InputSearch />
              </Box>
              <GridCreate onClick={() => setOpenCreateEditRole({
                open: true,
                id: "", 
              })} />
            </Box>
            <Box sx={{ height: 400, width: "100%" }}>
              <CustomDataGrid
                rows={roles.data}
                columns={columns}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
                slots={{ pagination: PaginationComponent }}
              />
            </Box>
          </Grid>
          <Grid size={{ md: 5, xs: 12 }}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoleListPage;
