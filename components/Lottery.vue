<template>
  <div class="p-8">
    <h1 class="font-bold text-3xl pb-2">Lottery Contract</h1>
    <div>
      <span>The contract is managed by {{ managerAccountAddress }}</span>
      <p>
        There are currently {{ players.length }} people playing and competing to
        win {{ etherBalance }} ether!
      </p>
    </div>
    <template v-if="managerAccountAddress === null">BLABLA</template>
    <template v-else-if="isCurrentUserManager"> MANAGER CONTENT </template>
    <template v-else>
      <h3 class="py-4 font-bold">Want to try your luck ?</h3>
      <div class="pl-6">
        <ValidationObserver
          ref="playerFormObserver"
          v-slot="{ invalid, dirty }"
        >
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <ValidationProvider
              v-slot="slotProps"
              name="Amount of ether"
              rules="required"
              slim
            >
              <a-form-item
                label="Amount of ether to enter"
                has-feedback
                :validate-status="toValidateStatus(slotProps)"
                :help="slotProps.errors[0]"
              >
                <a-input id="etherAmount" v-model="playerForm.etherAmount" />
              </a-form-item>
            </ValidationProvider>
            <a-button
              type="primary"
              :disabled="invalid || !dirty"
              :loading="false"
              @click="onPlayerEnter"
            >
              Enter
            </a-button>
          </a-form>
        </ValidationObserver>
      </div>
    </template>

    <h3 class="py-4 font-bold"></h3>
    <div class="pl-6"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import toValidateStatusMixin from '~/mixins/toValidateStatus';

export default {
  name: 'Lottery',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [toValidateStatusMixin],
  data() {
    return {
      managerAccountAddress: null,
      balance: null,
      players: [],
      playerForm: {
        etherAmount: '',
      },
    };
  },
  computed: {
    ...mapState({
      currentUserAccountAddress: (state) => state.user.accountAddress,
    }),
    isCurrentUserManager() {
      return false;
      // return this.managerAccountAddress === this.currentUserAccountAddress;
    },
    etherBalance() {
      return this.balance ? this.$web3.utils.fromWei(this.balance, 'ether') : 0;
    },
  },
  mounted() {
    this.getManager();
    this.getPlayers();
    this.getBalance();
  },
  methods: {
    async getManager() {
      try {
        const managerAccountAddress = await this.$lottery.methods
          .manager()
          .call();
        this.managerAccountAddress = managerAccountAddress.toLowerCase();
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
    async onPlayerEnter() {
      try {
        await this.$lottery.methods.enter().send({
          from: this.currentUserAccountAddress,
          value: this.$web3.utils.toWei(this.playerForm.etherAmount, 'ether'),
        });
        await this.getPlayers();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
