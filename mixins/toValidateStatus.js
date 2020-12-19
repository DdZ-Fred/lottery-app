export default {
  methods: {
    toValidateStatus({ errors, pristine, untouched, pending, valid }) {
      console.log('[MIXIN/toValidateStatus]', {
        errors,
        untouched,
        pristine,
        pending,
        valid,
      });
      if (errors[0]) {
        return 'error';
      }

      if (valid) {
        return 'success';
      }

      if (pending) {
        return 'validating';
      }

      return '';
    },
  },
};
