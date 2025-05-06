"use client";
import React, { useContext } from "react";
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Stack,
  Typography,
  Box,
  Divider,
  FormLabel,
  FormControl,
  Link,
  InputAdornment,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NextPage } from "next";
import MuiCard from "@mui/material/Card";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton } from "@mui/material";
import Image from "next/image";

import CustomTextField from "@/components/text-field";
import IconifyIcon, { FacebookIcon, GoogleIcon } from "@/components/Icon";
import { EMAIL_REG, PASSWORD_REG } from "@/configs/regex";
import { useAuth } from "@/hooks/useAuth";

import LoginLight from "../../../../../public/images/v2-login-light.png";
import ForgotPassword from "../components/ForgotPassword";

type TProps = {};
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

const LoginPage: NextPage<TProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [showPassword,setShowPassword] = React.useState(false);
  const [isRemember, setRememberMe] = React.useState(true);

  const { login } = useAuth();
  const theme = useTheme();

  const schema = yup.object({
    email: yup.string().required("Email is required").matches(EMAIL_REG, "The field is must email type"),
    password: yup.string().required("Password is required").matches(PASSWORD_REG,"The password is contain charactor, special character, number"),
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = handleSubmit((data)=> {
    if (!Object.keys(errors)?.length){
      login({ ...data, rememberMe: isRemember });
    }
  });
  return (
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
        backgroundColor: theme.palette.customColors?.bodyBg,
        height: "100%" }}>
        <Image src={LoginLight} alt="" style={{ height: "100%", width: "100%" }}></Image>
        </Box>
      <Box sx={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        
        padding: 2, }}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" elevation={0}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)",textAlign:"center" }}
          >
            Sign in
          </Typography>
          <form onSubmit={onSubmit} autoComplete="off">
              <Box sx={{ mt: 2 ,mb: 4 }}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      required
                      fullWidth
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mt: 2 ,mb: 4 }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Controller
                name="password"
       
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    placeholder="your password"
                    id="password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    type={showPassword ? "text" : "password"}
                    InputProps={
                      {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword 
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

            <FormControlLabel
              control={<Checkbox checked={isRemember} onChange={handleCheckboxChange} color="primary" />}
              label="Remember me"
            />

            <ForgotPassword open={open} handleClose={() => setOpen(false)} />

            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>

            <Link
              component="button"
              type="button"
              onClick={() => setOpen(true)}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </form>

          <Divider>or</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;