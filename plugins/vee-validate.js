import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules.umd';
import veeValidateEnLocale from 'vee-validate/dist/locale/en.json';
import veeValidateFrLocale from 'vee-validate/dist/locale/fr.json';

const allMessages = {
  en: veeValidateEnLocale.messages,
  fr: veeValidateFrLocale.messages,
};

function veeValidate3Plugin() {
  // Rules aren't available by default so we're importing all of them here
  Object.keys(rules).forEach((rule) => {
    extend(rule, {
      ...rules[rule], // eslint-disable-line import/namespace
      message: () => allMessages.en[rule],
    });
  });
}

export default veeValidate3Plugin;
