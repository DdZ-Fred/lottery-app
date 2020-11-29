<template>
  <div>
    <h3>{{ $web3.version }}</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$web3.eth.getAccounts().then(console.log)
  },
}
</script>
