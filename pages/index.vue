<template>
  <Lottery v-if="isAccountReady" />
  <div v-else>LOADING</div>
</template>

<script lang="js">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Lottery from '~/components/Lottery.vue'

export default {
  ssr: false,
  components: { Lottery },
  computed: {
    ...mapGetters({
      isAccountReady: 'user/isAccountAddressAvailable'
    }),
  }
}
</script>
