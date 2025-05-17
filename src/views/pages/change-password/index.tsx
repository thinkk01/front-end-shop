"use client";
import React, { useEffect } from "react";
import {
  Button,
  CssBaseline,
  Stack,
  Typography,
  Box,
  FormLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NextPage } from "next";
import MuiCard from "@mui/material/Card";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import CustomTextField from "@/components/text-field";
import IconifyIcon from "@/components/Icon";
import RegisterLight from "@/../../public/images/v2-login-light.png";
import RegisterDark from "@/../../public/images/v2-login-light.png";
import { PASSWORD_REG } from "@/configs/regex";
import { AppDispatch, RootState } from "@/stores";
import FallbackSpinner from "@/components/fall-back";
import { resetInitialState } from "@/stores/apps/auth";
import { ROUTE_CONFIG } from "@/configs/route";
import { changePasswordMeAsync } from "@/stores/apps/auth/actions";
import { useAuth } from "@/hooks/useAuth";
type TProps = {}
type TPropsDefault = {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
};
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: "\"\"",
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ChangePasswordPage: NextPage<TProps> = () => {
  // state
  const [open, setOpen] = React.useState(false);
  const [showCurrentPassword,setShowCurrentPassword] = React.useState(false);
  const [showNewPassword,setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword,setShowConfirmNewPassword] = React.useState(false);
  // redux
  const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  // transalte
  const { t } = useTranslation();
  // router
  const router = useRouter();
  const { logout } = useAuth();
  // theme
  const theme = useTheme();

  const schema = yup.object({
    currentPassword: yup.string()
        .required("Email is required")
        .matches(PASSWORD_REG, "The password is contain charactor, special character, number"),
    newPassword: yup.string()
        .required("Password is required")
        .matches(PASSWORD_REG,"The password is contain charactor, special character, number"),
    confirmNewPassword: yup.string()
        .required("Confirm Password is required")
        .matches(PASSWORD_REG,"The password is contain charactor, special character, number")
        .oneOf([yup.ref("newPassword"),"","Confirm Password no match with password"])
  });
  const defaultValues: TPropsDefault = {
    currentPassword:"",
    newPassword:"",
    confirmNewPassword:""
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => {
    if (!Object.keys(errors).length){
      dispatch(changePasswordMeAsync({ currentPassword: data.currentPassword, newPassword: data.newPassword }));
    }
  };
  useEffect(() => {
    if (messageChangePassword) {
      if (isErrorChangePassword){
        toast.error(messageChangePassword);
      } else if (isSuccessChangePassword) {
        toast.success(messageChangePassword);
        router.push(ROUTE_CONFIG.LOGIN);
        logout();
      }
      dispatch(resetInitialState());
    }
  },[isErrorChangePassword, isSuccessChangePassword, messageChangePassword]);
  return (
    <>
    { isLoading && <FallbackSpinner/> } 
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: theme.palette.background.paper }}>
      <Box sx={{ display: "flex",
        alignItems: "center",
        justifyContent: "center" }}>
      <Box
      display={{
        md: "flex",
        xs: "none"
      }}
      sx={{
        alignItems: "center",
        justifyContent: "center", flex: 1, 
        margin: "30px",
        borderRadius: "20px", 
        backgroundColor: theme.palette.customColors.bodyBg,
        height: "100%" }}>
        <Image src={theme.palette.mode === "light" ? RegisterLight : RegisterDark} alt="register image" style={{ height: "100%", width: "100%" }}></Image>
        </Box>
      <Box sx={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        
        padding: 2, }}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign:"center" }}
          >
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Box sx={{ mt: 2 ,mb: 4 }}>
                <FormLabel htmlFor="currentPassword">{t("Current Password")}</FormLabel>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      id="currentPassword"
                      placeholder="enter your password"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      required
                      fullWidth
                      error={Boolean(errors?.currentPassword)}
                      helperText={errors?.currentPassword?.message}
                      type={showCurrentPassword ? "text" : "password"}
                      InputProps={
                        {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton edge="end" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                { showCurrentPassword 
                                ?<IconifyIcon icon="material-symbols:visibility-outline" width="24" height="24"></IconifyIcon> 
                              : <IconifyIcon icon="material-symbols-light:visibility-off-outline-rounded" width="24" height="24"></IconifyIcon>}
                              </IconButton>  
                            </InputAdornment>
                          )
                        }
                      }
                    />
                  )}
                />
              </Box>
              <Box sx={{ mt: 2 ,mb: 4 }}>
              <FormLabel htmlFor="newPassword">{t("New Password")}</FormLabel>
              <Controller
                name="newPassword"
       
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    placeholder="your new password"
                    id="password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                    error={Boolean(errors?.newPassword)}
                    helperText={errors?.newPassword?.message}
                    type={showNewPassword ? "text" : "password"}
                    InputProps={
                      {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" onClick={() => setShowNewPassword(!showNewPassword)}>
                              { showNewPassword 
                              ?<IconifyIcon icon="material-symbols:visibility-outline" width="24" height="24"></IconifyIcon> 
                            : <IconifyIcon icon="material-symbols-light:visibility-off-outline-rounded" width="24" height="24"></IconifyIcon>}
                            </IconButton>  
                          </InputAdornment>
                        )
                      }
                    }
                  />
                )}
              />
   </Box>
   <Box sx={{ mt: 2 ,mb: 4 }}>
              <FormLabel htmlFor="confirmNewPassword">{t("Confirm New Password")}</FormLabel>
              <Controller
                name= "confirmNewPassword"
       
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    placeholder="your confirm New Password"
                    id="confirmNewPassword"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                    error={Boolean(errors?.confirmNewPassword)}
                    helperText={errors?.confirmNewPassword?.message}
                    type={showConfirmNewPassword ? "text" : "password"}
                    InputProps={
                      {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                              {showConfirmNewPassword 
                              ?<IconifyIcon icon="material-symbols:visibility-outline" width="24" height="24"></IconifyIcon> 
                            : <IconifyIcon icon="material-symbols-light:visibility-off-outline-rounded" width="24" height="24"></IconifyIcon>}
                            </IconButton>  
                          </InputAdornment>
                        )
                      }
                    }
                  />
                )}
              />
   </Box>

            <Button type="submit" fullWidth variant="contained">
              {t("Change Password")}
            </Button>
          </form>
          
        </Card>
      </SignInContainer>
      </Box>
      </Box>
    </Box>
    </>
  );
};

export default ChangePasswordPage;