import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export default async (_, inject) => {
  let web3 = null

  // Basically returns window.ethereum
  const provider = await detectEthereumProvider()

  if (provider) {
    console.log('[PROVIDER]', provider)
    web3 = new Web3(provider)

    // Check doc: https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
    // Request the user to provide a account address
    // opens Metamask extension to allow the user to select one
    await provider.request({ method: 'eth_requestAccounts' })
  } else {
    console.error('Please install Metamask!! using default provider')
    web3 = new Web3(Web3.givenProvider)
  }

  inject('web3', web3)
}
