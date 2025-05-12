import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //language initial page
    lng: "vi",
    backend: {
      loadPath: "/locales/{{lng}}.json"
    },
    fallbackLng: "en",
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    }
  });

export default i18n;
export const LANGUAGE_OPTIONS = [
  {
    lang: "Vietnamese",
    value: "vi",
  },
  {
    lang: "English",
    value: "en",
  }
];
