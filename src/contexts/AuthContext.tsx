import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import authConfig from "@/configs/auth";
import { loginAuth, logoutAuth } from "@/service/auth";
import { CONFIG_API } from "@/configs/api";
import { removeLocalUserData, setLocalUserData } from "@/helper/storage";
import instanceAxios from "@/helper/axios";

import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from "./types";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);

  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
      if (storedToken) {
        setLoading(true);
        await instanceAxios
          .get(CONFIG_API.AUTH.AUTHME)
          .then(async response => {
            // console.log(response)
            setLoading(false);
            setUser({ ...response.data.data });
          })
          .catch(() => {
            removeLocalUserData();
            setUser(null);
            setLoading(false);
            if (authConfig.onTokenExpiration === "logout" && !router.pathname.includes("login")) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true);
    loginAuth({ email: params.email, password: params.password })
      .then(async response => {
        setLoading(false);
        params.rememberMe
          ? setLocalUserData(JSON.stringify(response.data.userData),response.data.access_token,response.data.refresh_token)
          : null;
        const returnUrl = router.query.returnUrl;
        setUser({ ...response.data.user });
        params.rememberMe ? window.localStorage.setItem("userData", JSON.stringify(response.data.user)) : null;

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        router.replace(redirectURL as string);
      })

      .catch(err => {
        setLoading(false);
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    logoutAuth().then(res => {
      setUser(null);
      removeLocalUserData();
      router.push("/login");
    });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
