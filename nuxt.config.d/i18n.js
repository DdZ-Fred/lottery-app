export default {
  vuex: {
    moduleName: 'i18n',
    syncLocale: true,
  },
  strategy: 'no_prefix', // routes won't have a locale prefix
  lazy: true,
  langDir: 'locales/',
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-UK',
      file: 'en.js',
    },
    {
      code: 'fr',
      name: 'Français',
      iso: 'fr-FR',
      file: 'fr.js',
    },
  ],
  defaultLocale: 'en',
};
