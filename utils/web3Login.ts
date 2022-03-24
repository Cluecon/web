import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

export async function getWeb3Address() {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const address = await signer.getAddress()

  return address
}
