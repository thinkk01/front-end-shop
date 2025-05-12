"use client";
import React, { useEffect, useTransition } from "react";
import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Box, Button, Paper, styled } from "@mui/material";
import { FormLabel } from "@mui/material";
import { useTheme } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { EMAIL_REG, PASSWORD_REG } from "@/configs/regex";
import { useAuth } from "@/hooks/useAuth";
import CustomTextField from "@/components/text-field";
import IconifyIcon from "@/components/Icon";
import WrapFileUpload from "@/components/wrap-file-upload";
type TProps = {}
type TPropsDefault = {
    email: string,
    address:string,
    city:string,
    phoneNumber:string,
    role:string,
    fullName:string
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
const MyProfilePage: NextPage<TProps> = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const schema = yup.object({
    email: yup.string()
          .required("Email is required")
          .matches(EMAIL_REG, "The field is must email type"),
    address: yup.string()
          .required("Adress is required"),
    city: yup.string()
          .required("City is required"),
    fullName: yup.string()
            .required("Fullname is required"),
    phoneNumber: yup.string()
            .required("Phone Number is required"),
    role: yup.string()
            .required("Email is required")
    });
   const defaultValues: TPropsDefault = {
     email:"",
     address:"",
     city:"",
     phoneNumber:"",
     role:"",
     fullName:""
 };
 const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (user) {
        reset({
            email:"",
            address:"",
            city:"",
            phoneNumber:"",
            role: user.role?.name,
            fullName:""
        });
    } 
  }, [user]);
   const onSubmit = handleSubmit((data)=> {
});
const handleUploadFunction = () => {

};
  return (
    <form onSubmit={onSubmit} autoComplete="off">   
        <Grid container spacing={2} >
            <Grid container size={{ md:7, xs:6 }} spacing={2}>
            <Grid size={{ md:7, xs:6 }} sx={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:2 }} >
                  <Avatar sx={{ width: 108, height: 108 } }>
                    {user?.avatar ? (
                        <Image 
                            src={ user?.avatar || "" }
                            alt="avatar"
                            style={{
                                height:"auto",
                                width:"auto",
                        }}/>
                    ): (
                        <IconifyIcon icon="ph:user-thin"/>
                    )}
                  </Avatar>
                  <Box >
                    <WrapFileUpload uploadFunction={handleUploadFunction} objectAcceptFile={{
                        "image/jpeg" : [".jpg", ".jpeg"],
                        "image/png": [".png"]
                    }}>
                        <Button type="submit" fullWidth variant="outlined">
                            {t("Upload")}
                        </Button>
                    </WrapFileUpload>
                  </Box>
                </Grid>
                  <Grid size={{ md:7, xs:6 }} >
                        <FormLabel htmlFor="email">{t("Email")}</FormLabel>
                        <Box sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "15px",
                        padding: 2
                        }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                id="email"
                                placeholder={t("Type_your_email")}
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
                    </Grid>
                    <Grid size={{ md:7, xs:6 }} >
                        <FormLabel htmlFor="email">{t("Role")}</FormLabel>
                        <Box sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "15px",
                        padding: 2
                        }}>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                id="role"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                required
                                disabled
                                fullWidth
                                error={Boolean(errors?.role)}
                                helperText={errors?.role?.message}
                            />
                            )}
                        />
                        </Box>
                    </Grid>
            </Grid>
            <Grid container size={{ xs: 6, md: 5 }} spacing={2} sx={{ justifyContent: "center" }}>
                <Grid container size={{ xs: 6, md: 10 }} spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid size={{ xs: 6, md: 5 }} >
                        <FormLabel htmlFor="fullName">{t("Full Name")}</FormLabel>
                        <Box sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "15px",
                        padding: 2
                        }}>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                id="fullName"
                                placeholder={t("Type_your_full_name")}
                                type="text"
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
                    </Grid>
                    <Grid size={{ xs: 6, md: 5 }}>
                    <FormLabel htmlFor="address">{t("Address")}</FormLabel>
                    <Box sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2
                    }}>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                            id="address"
                            placeholder={t("Type_your_address")}
                            type="text"
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
                    </Grid>
                </Grid>
                <Grid container size={{ md:10, xs:12 }} spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid size={{ md:5, xs:12 }} >
                        <FormLabel htmlFor="city">{t("City")}</FormLabel>
                        <Box sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "15px",
                        padding: 2
                        }}>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                id="city"
                                placeholder={t("Type_your_city")}
                                type="text"
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
                    </Grid>
                    <Grid size={{ md:5, xs:12 }}>
                    <FormLabel htmlFor="phoneNumber">{t("Phone Number")}</FormLabel>
                    <Box sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2
                    }}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                            id="phone"
                            placeholder={t("Type_your_phone_number")}
                            type="number"
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
                    </Grid>
            </Grid>
            </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained">
            Thay đổi
        </Button>
    </form>
  );
};

export default MyProfilePage;