import { localize } from 'vee-validate';

function i18nPlugin({ app }) {
  localize(app.i18n.locale);

  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // Change data/time library locale (moment, day.js, ...)

    // Change vee-validate locale
    localize(newLocale);
  };
}

export default i18nPlugin;
