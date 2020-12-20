import veeValidateFrLocale from 'vee-validate/dist/locale/fr.json';

export default {
  ...veeValidateFrLocale.messages,

  // Add custom validation rules here,
  iban: 'Ce IBAN est invalide',
  bic: 'Ce BIC est invalide',
};
