export const state = () => ({
  accountAddress: null,
});

export const mutations = {
  setAccountAddress(state, address) {
    state.accountAddress = address;
  },
};

export const getters = {
  isAccountAddressAvailable: (state) => state.accountAddress !== null,
};
