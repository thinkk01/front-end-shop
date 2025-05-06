import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import "@/configs/i18n";

import AuthGuard from "@/components/auth/AuthGuard";
import { AuthProvider } from "@/contexts/AuthContext";
import themeConfig from "@/configs/themeConfig";
import { store } from "@/stores";
import GuestGuard from "@/components/auth/GuestGuard";
import { defaultACLObj } from "@/configs/acl";
import FallbackSpinner from "@/components/fall-back";
import { SettingsConsumer, SettingsProvider } from "@/contexts/SettingsContext";
import AclGuard from "@/components/auth/AclGuard";
import ReactHotToast from "@/components/react-hot-toast";
import { useSettings } from "@/hooks/useSettings";
import ThemeComponent from "@/theme/ThemeComponent";
import UserLayout from "@/views/layouts/UserLayout";

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};
// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<FallbackSpinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<FallbackSpinner />}>{children}</AuthGuard>;
  }
};
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  setConfig?: () => any;
  authGuard?: boolean;
  guestGuard?: boolean;
  acl?: any;
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;

  const { settings } = useSettings();

  // Variables
  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  const toastOptions = {
    success: {
      className: "react-hot-toast",
      style: {
        background: "#DDF6E8",
      },
    },
    error: {
      className: "react-hot-toast",
      style: {
        background: "#FDE4D5",
      },
    },
  };

  return (
    <Provider store={store}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name="description"
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta
          name="keywords"
          content="Material Design, MUI, Admin Template, React Admin Template"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <Guard authGuard={authGuard} guestGuard={guestGuard}>
                    <AclGuard
                      aclAbilities={aclAbilities}
                      guestGuard={guestGuard}
                      authGuard={authGuard}
                    >
                      {getLayout(<Component {...pageProps} />)}
                    </AclGuard>
                  </Guard>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={toastOptions} />
                  </ReactHotToast>
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </Provider>
  );
}
