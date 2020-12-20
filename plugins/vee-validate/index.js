import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules.umd';
import * as customRules from './customRules';

const allRules = {
  // Rules aren't available by default so we're importing all of them here
  ...rules,
  ...customRules,
};

function veeValidate3Plugin({ app }) {
  Object.keys(allRules).forEach((rule) => {
    extend(rule, {
      ...allRules[rule], // eslint-disable-line import/namespace
      message: (_, values) => {
        return app.i18n.t(`veeValidate.${rule}`, {
          ...values,
          _field_: app.i18n.t(values._field_),
        });
      },
    });
  });
}

export default veeValidate3Plugin;
