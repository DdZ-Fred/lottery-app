import veeValidateEnLocale from 'vee-validate/dist/locale/en.json';

export default {
  ...veeValidateEnLocale.messages,

  // Add custom validation rules here
  iban: 'This IBAN is invalid',
  bic: 'This BIC is invalid',
};
