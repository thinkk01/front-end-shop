"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Paper,
  styled,
  FormLabel,
  useTheme,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect from "@/components/custom-select";
import { AppDispatch, RootState } from "@/stores";
import { EMAIL_REG } from "@/configs/regex";
import CustomTextField from "@/components/text-field";
import IconifyIcon from "@/components/Icon";
import WrapFileUpload from "@/components/wrap-file-upload";
import { getAuthMe } from "@/service/auth";
import { UserDataType } from "@/contexts/types";
import { convertBase64, separationFullName, toFullName } from "@/utils";
import { updateAuthMeAsync } from "@/stores/auth/actions";
import FallbackSpinner from "@/components/fall-back";
import { resetInitialState } from "@/stores/auth";
import Spinner from "@/components/spinner";

type TProps = {};
type TPropsDefault = {
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  role: string;
  fullName: string;
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
  const [loading, setLoading] = useState(false);
  // const { user } = useAuth();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState<UserDataType | null>(null);
  const [roleId, setRoleId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  );
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .matches(EMAIL_REG, "The field is must email type"),
    fullName: yup.string().required("Fullname is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .min(8, "The Phone Number is min 8 number"),
    role: yup.string().required("Email is required"),
    city: yup.string().notRequired(),
    address: yup.string().notRequired(),
  });
  const defaultValues: TPropsDefault = {
    email: "",
    address: "",
    city: "",
    phoneNumber: "",
    role: "",
    fullName: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const fetchGetAuthMe = async () => {
    await getAuthMe()
      .then(async (res) => {
        setLoading(false);
        const data = res?.data;
        if (data) {
          setRoleId(data?.role);
          setAvatar(data?.avatar);
          reset({
            email: data?.email,
            address: data?.address,
            city: data?.city,
            phoneNumber: data?.phoneNumber,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
            role: data?.role?.name,
          });
        }

        setUser({ ...res.data });
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchGetAuthMe();
  }, [i18n.language]);
  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe);
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe);
        fetchGetAuthMe();
      }
      dispatch(resetInitialState());
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe]);
  const onSubmit = handleSubmit((data: any) => {
    const { firstName, lastName, middeName } = separationFullName(data.fullName, i18n.language);
    dispatch(
      updateAuthMeAsync({
        email: data.email,
        firstName: firstName,
        lastName: lastName,
        middleName: middeName,
        role: roleId,
        phoneNumber: data.phoneNumber,
        avatar,
        address: data.address,
        // city: data.city
      })
    );
  });
  const handleUploadFunction = async (data: File) => {
    const base64 = await convertBase64(data);
    setAvatar(base64 as string);
  };
  return (
    <>
      {loading || (isLoading && <Spinner />)}
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid container size={{ md: 7, xs: 6 }} spacing={2}>
            <Grid size={{ md: 7, xs: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: -5,
                      right: -20,
                      zIndex: 2,
                      color: theme.palette.primary.main,
                    }}
                    edge="start"
                    color="inherit"
                    onClick={() => setAvatar("")}
                  >
                    <IconifyIcon icon="material-symbols:close" />
                  </IconButton>
                  {avatar ? (
                    <Avatar src={avatar} sx={{ width: 108, height: 108 }}>
                      <IconifyIcon icon="ph:user-thin" fontSize={70} />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: 108, height: 108 }}>
                      <IconifyIcon icon="ph:user-thin" />
                    </Avatar>
                  )}
                </Box>
                <WrapFileUpload
                  uploadFunction={handleUploadFunction}
                  objectAcceptFile={{
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                  }}
                >
                  <Button type="submit" fullWidth variant="outlined">
                    {t("Upload")}
                  </Button>
                </WrapFileUpload>
              </Box>
            </Grid>
            <Grid size={{ md: 7, xs: 6 }}>
              <FormLabel htmlFor="email">{t("Email")}</FormLabel>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "15px",
                  padding: 2,
                }}
              >
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
                      disabled
                      fullWidth
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid size={{ md: 7, xs: 6 }}>
              <FormLabel htmlFor="email">{t("Role")}</FormLabel>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "15px",
                  padding: 2,
                }}
              >
                <Controller
                  name="role"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomSelect
                      fullWidth
                      options={[]}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors?.role)}
                      placeholder={t("enter_your_roles")}
                      value={value}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container size={{ xs: 6, md: 5 }} spacing={2} sx={{ justifyContent: "center" }}>
            <Grid container size={{ xs: 6, md: 10 }} spacing={2} sx={{ justifyContent: "center" }}>
              <Grid size={{ xs: 6, md: 5 }}>
                <FormLabel htmlFor="fullName">{t("Full Name")}</FormLabel>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2,
                  }}
                >
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
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2,
                  }}
                >
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
                        fullWidth
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container size={{ md: 10, xs: 12 }} spacing={2} sx={{ justifyContent: "center" }}>
              <Grid size={{ md: 5, xs: 12 }}>
                <FormLabel htmlFor="city">{t("City")}</FormLabel>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2,
                  }}
                >
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomSelect
                        fullWidth
                        options={[]}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors?.city)}
                        value={value}
                        placeholder={t("Type_your_city")}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 5, xs: 12 }}>
                <FormLabel htmlFor="phoneNumber">{t("Phone Number")}</FormLabel>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    padding: 2,
                  }}
                >
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        id="phone"
                        placeholder={t("Type_your_phone_number")}
                        type="number"
                        onChange={(e) => {
                          const numValue = e.target.value.replace(/\D/g, "");
                          onChange(numValue);
                        }}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          minLength: 8,
                        }}
                        onBlur={onBlur}
                        value={value}
                        required
                        fullWidth
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                      />
                    )}
                  />
                  {!errors?.email?.message && (
                    <FormHelperText
                      sx={{
                        color: !errors?.role
                          ? theme?.palette?.error.main
                          : `rgba(${theme.palette.customColors.main}, 0.42)`,
                      }}
                    >
                      {errors?.email?.message}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained">
          Thay đổi
        </Button>
      </form>
    </>
  );
};

export default MyProfilePage;
