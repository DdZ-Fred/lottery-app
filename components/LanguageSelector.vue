<template>
  <a-select
    :default-value="currentLocale"
    :loading="$wait.is('language-change')"
    @change="onLanguageChange"
  >
    <a-select-option
      v-for="locale in $i18n.locales"
      :key="locale.code"
      :value="locale.code"
    >
      {{ locale.name }}
    </a-select-option>
  </a-select>
</template>
<script>
import { waitFor } from 'vue-wait';

export default {
  name: 'LanguageSelector',
  computed: {
    currentLocale() {
      return this.$i18n.locale || 'en';
    },
  },
  methods: {
    onLanguageChange: waitFor('language-change', async function (newValue) {
      await this.$i18n.setLocale(newValue);
    }),
  },
};
</script>
