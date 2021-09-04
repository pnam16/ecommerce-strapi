<template>
  <div />
</template>

<script>

export default {
  components: {
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'English',
      },
      {
        locale: 'fr',
        img: require('@/assets/images/flags/fr.png'),
        name: 'French',
      },
      {
        locale: 'de',
        img: require('@/assets/images/flags/de.png'),
        name: 'German',
      },
      {
        locale: 'pt',
        img: require('@/assets/images/flags/pt.png'),
        name: 'Portuguese',
      },
    ]
    /* eslint-disable global-require */

    return {
      locales,
    }
  },
}
</script>

<style>

</style>
