import { extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules.umd';

function veeValidate3Plugin({ app }) {
  // Rules aren't available by default so we're importing all of them here
  Object.keys(rules).forEach((rule) => {
    extend(rule, {
      ...rules[rule], // eslint-disable-line import/namespace
    });
  });

  // Add more validation rules here

  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`veeValidate.${values._rule_}`, values),
  });
}

export default veeValidate3Plugin;
