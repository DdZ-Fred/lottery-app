import { localize } from 'vee-validate';

function i18nPlugin({ app }) {
  const initialLocale =
    app.$cookies.get('i18n_redirected') || app.i18n.defaultLocale;

  localize(initialLocale);

  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // Change data/time library locale (moment, day.js, ...)

    // Change vee-validate locale
    localize(newLocale);
  };
}

export default i18nPlugin;
