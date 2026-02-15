export class LanguageInitializer {
  public static language = "en";
  static setLanguage(locale: string) {
    this.language = locale;
  }
}
