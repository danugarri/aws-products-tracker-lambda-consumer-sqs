export class LanguageInitializer {
  static language = "en";
  static setLanguage(locale: string) {
    LanguageInitializer.language = locale;
  }
}
