<template>
  <a-select :default-value="currentLocale" @change="onLanguageChange">
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
export default {
  name: 'LanguageSelector',
  computed: {
    currentLocale() {
      return this.$i18n.locale || 'en';
    },
  },
  methods: {
    async onLanguageChange(newValue) {
      await this.$i18n.setLocale(newValue);
    },
  },
};
</script>
