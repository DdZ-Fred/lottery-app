<template>
  <div>
    <h1>Lottery Contract</h1>
    <p>The contract is managed by {{ manager }}</p>
  </div>
</template>

<script>
export default {
  name: 'Lottery',
  data() {
    return {
      manager: null,
      balance: null,
      players: [],
    };
  },
  mounted() {
    this.getManager();
    this.getPlayers();
    this.getBalance();
  },
  methods: {
    async getManager() {
      try {
        const manager = await this.$lottery.methods.manager().call();
        this.manager = manager;
      } catch (error) {
        console.error(error);
      }
    },
    async getPlayers() {
      try {
        const players = await this.$lottery.methods.getPlayers().call();
        this.players = players;
      } catch (error) {
        console.error(error);
      }
    },
    async getBalance() {
      try {
        const balance = await this.$web3.eth.getBalance(
          this.$lottery.options.address
        );
        this.balance = balance;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
