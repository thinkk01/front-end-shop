import { hexToRGBA } from "@/utils/hex-to-rgba";

import { OwnerStateThemeType } from ".";

const IconButton = {
  MuiIconButton: {
    variants: [
      {
        props: { color: "primary" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
          }
        })
      },
      {
        props: { color: "secondary" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.08)
          }
        })
      },
      {
        props: { color: "success" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.success.main, 0.08)
          }
        })
      },
      {
        props: { color: "error" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.error.main, 0.08)
          }
        })
      },
      {
        props: { color: "warning" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.warning.main, 0.08)
          }
        })
      },
      {
        props: { color: "info" },
        style: ({ theme }: OwnerStateThemeType) => ({
          "&:hover": {
            backgroundColor: hexToRGBA(theme.palette.info.main, 0.08)
          }
        })
      }
    ],
    styleOverrides: {
      root: ({ theme }: OwnerStateThemeType) => ({
        "&:hover": {
          backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`
        }
      })
    }
  }
};

export default IconButton;
