// import "./i18n/i18n"; // Initialize i18n
import i18n from "../src/i18n/i18n";
(async () => {
  console.log("en title:", i18n.t("EMAIL_APP_TITLE", { lng: "en" }));
  console.log("IT title:", i18n.t("EMAIL_APP_SUBTITLE", { lng: "it" }));
  console.log("missing key:", i18n.t("___DOES_NOT_EXIST___", { lng: "en" }));
})();
