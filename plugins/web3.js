// import { Plugin } from '@nuxt/types';
import Web3 from 'web3';
// import { provider } from 'web3-core';
import detectEthereumProvider from '@metamask/detect-provider';
import { abi } from '~/build/contracts/Lottery.json';

const lotteryContractAddress = '0xFEb5eE93409e545adfA2F06d3a8cB6Ebc4e32Ec4';

const web3Plugin = async ({ store }, inject) => {
  let web3 = null;

  // Basically returns window.ethereum
  const provider = await detectEthereumProvider();

  if (provider) {
    console.log('[PROVIDER]', provider);
    web3 = new Web3(provider);

    // Check doc: https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
    // Request the user to provide a account address.
    // It opens Metamask extension to allow the user to select one
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (accounts.length) {
      console.log('[ACCOUNTS-REQUEST-OK]', { accounts });
      store.commit('user/setAccountAddress', accounts[0]);
    } else {
      console.log('[ACCOUNTS-REQUEST-EMPTY]');
    }
  } else {
    console.error('Please install Metamask!! using default provider');
    web3 = new Web3(Web3.givenProvider);
  }

  inject('web3', web3);
  inject('lottery', new web3.eth.Contract(abi, lotteryContractAddress));
};

export default web3Plugin;
