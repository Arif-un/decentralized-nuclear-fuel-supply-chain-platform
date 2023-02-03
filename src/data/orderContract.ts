import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'

import { abi, networks } from '../../build/contracts/Orders.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function orderContract(ethereum: any) {
  const web3 = new Web3(ethereum)
  return new web3.eth.Contract(abi as AbiItem[], networks['5777'].address)
}
