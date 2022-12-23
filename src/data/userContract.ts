import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'

import userJson from '../../build/contracts/Users.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function userContract(ethereum: any) {
  const web3 = new Web3(ethereum)
  return new web3.eth.Contract(userJson.abi as AbiItem[], userJson.networks['5777'].address)
}
