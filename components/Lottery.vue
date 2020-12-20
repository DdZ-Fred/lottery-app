<template>
  <div class="p-8">
    <h1 v-t="'lottery.title'" class="font-bold text-3xl pb-2" />
    <language-selector />
    <div>
      <span
        v-t="{ path: 'lottery.managedBy', args: { managerAccountAddress } }"
      />
      <p
        v-t="{
          path: 'lottery.playersAndBalance',
          args: {
            playersCount: players.length,
            lotteryEtherBalance: balance,
          },
        }"
      />
    </div>
    <template v-if="managerAccountAddress === null">BLABLA</template>
    <template v-else-if="isCurrentUserManager">MANAGER CONTENT</template>
    <template v-else>
      <h3 v-t="'lottery.playerContent.title'" class="py-4 font-bold" />
      <div class="pl-6">
        <ValidationObserver
          ref="playerFormObserver"
          v-slot="{ invalid, dirty }"
        >
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <ValidationProvider
              v-slot="slotProps"
              name="lottery.playerContent.etherAmountField"
              rules="required|iban"
              slim
            >
              <a-form-item
                :label="$t('lottery.playerContent.etherAmountField')"
                has-feedback
                :validate-status="toValidateStatus(slotProps)"
                :help="slotProps.errors[0]"
              >
                <a-input id="etherAmount" v-model="playerForm.etherAmount" />
              </a-form-item>
            </ValidationProvider>
            <a-button
              v-t="'common.enter'"
              type="primary"
              :disabled="invalid || !dirty"
              :loading="$wait.is('player-enter')"
              @click="onPlayerEnter"
            />
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
import { waitFor } from 'vue-wait';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import toValidateStatusMixin from '~/mixins/toValidateStatus';
import LanguageSelector from '~/components/LanguageSelector.vue';

export default {
  name: 'Lottery',
  components: {
    ValidationProvider,
    ValidationObserver,
    LanguageSelector,
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
    getManager: waitFor('get-manager', async function () {
      try {
        const managerAccountAddress = await this.$lottery.methods
          .manager()
          .call();
        this.managerAccountAddress = managerAccountAddress.toLowerCase();
      } catch (error) {
        console.error(error);
      }
    }),
    getPlayers: waitFor('get-players', async function () {
      try {
        const players = await this.$lottery.methods.getPlayers().call();
        this.players = players;
      } catch (error) {
        console.error(error);
      }
    }),
    getBalance: waitFor('get-balance', async function () {
      try {
        const balance = await this.$web3.eth.getBalance(
          this.$lottery.options.address
        );
        this.balance = balance;
      } catch (error) {
        console.error(error);
      }
    }),
    onPlayerEnter: waitFor('player-enter', async function () {
      try {
        await this.$lottery.methods.enter().send({
          from: this.currentUserAccountAddress,
          value: this.$web3.utils.toWei(this.playerForm.etherAmount, 'ether'),
        });
        await this.getPlayers();
      } catch (error) {
        console.log(error);
      }
    }),
  },
};
</script>
