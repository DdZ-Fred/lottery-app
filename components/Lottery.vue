<template>
  <div class="p-8">
    <h1 class="font-bold text-3xl pb-2">Lottery Contract</h1>
    <div>
      <span>The contract is managed by {{ manager }}</span>
      <p>
        There are currently {{ players.length }} people playing and competing to
        win {{ balance }} ether!
      </p>
    </div>

    <h3 class="py-4 font-bold">Want to try your luck ?</h3>
    <div class="pl-4">
      <fieldset>
        <label for="etherAmount">Amount of ether to enter</label>
        <input
          id="etherAmount"
          v-model="form.etherAmount"
          type="text"
          name="etherAmount"
        />
      </fieldset>
    </div>

    <h3 class="py-4 font-bold"></h3>
    <div class="pl-4"></div>
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
      form: {
        etherAmount: '',
      },
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
