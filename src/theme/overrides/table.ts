import { OwnerStateThemeType } from ".";

const Table = () => {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[0],
          borderTopColor: theme.palette.divider
        })
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          textTransform: "uppercase",
          "& .MuiTableCell-head": {
            fontWeight: 500,
            letterSpacing: "1px",
            fontSize: theme.typography.body2.fontSize
          }
        })
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          "& .MuiTableCell-body": {
            letterSpacing: "0.25px",
            color: theme.palette.text.secondary,
            "&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)": {
              paddingTop: theme.spacing(3.5),
              paddingBottom: theme.spacing(3.5)
            }
          }
        })
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          "& .MuiTableCell-head:not(.MuiTableCell-paddingCheckbox):first-of-type, & .MuiTableCell-root:not(.MuiTableCell-paddingCheckbox):first-of-type ":
            {
              paddingLeft: theme.spacing(6)
            },
          "& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child": {
            paddingRight: theme.spacing(6)
          }
        })
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderBottom: `1px solid ${theme.palette.divider}`
        }),
        paddingCheckbox: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(3.25)
        }),
        stickyHeader: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.customColors.tableHeaderBg
        })
      }
    }
  };
};

export default Table;
