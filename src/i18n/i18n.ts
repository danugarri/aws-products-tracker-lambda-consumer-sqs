import i18n from "i18next";
// import Backend from "i18next-fs-backend";

import { en } from "./translations/en";
import { fr } from "./translations/fr";
import { de } from "./translations/de";
import { zh } from "./translations/zh";
import { it } from "./translations/it";
import { pt } from "./translations/pt";
import { es } from "./translations/es";

const resources = {
  en: {
    translation: { ...en },
  },
  es: {
    translation: { ...es },
  },
  pt: {
    translation: { ...pt },
  },
  fr: {
    translation: { ...fr },
  },
  zh: {
    translation: { ...zh },
  },
  de: {
    translation: { ...de },
  },
  it: {
    translation: { ...it },
  },
};

i18n.init({
  resources,
  fallbackLng: "en",
  // lng:

  // interpolation: {
  //   escapeValue: false,
  // },

  // backend: {
  //   loadPath: path.join(process.cwd(), "src/i18n/translations", "{{lng}}", "{{ns}}.json"), // Path to translation files
  // },
});

export default i18n;
