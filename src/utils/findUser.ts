import { useEffect, useState } from 'react'

import { useMetaMask } from 'metamask-react'
import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'

import { setAccountInfo } from '@/global-states/UserState'
import useTypedSelector from '@/hooks/useTypedSelector'

import userJson from '../../build/contracts/Users.json'
import store from '../global-states/store'

export default function useUserLogin() {
  const metaMask = useMetaMask()
  const [login, setLogin] = useState(false)
  const userAccountHash = useTypedSelector((state) => state.UserSlice.accountHash)

  useEffect(() => {
    if (!metaMask.ethereum) {
      return undefined
    }

    const web3 = new Web3(metaMask.ethereum)

    const userContract = new web3.eth.Contract(
      userJson.abi as AbiItem[],
      userJson.networks['5777'].address,
    )

    userContract.methods
      .getUserByAccountHash(metaMask.account)
      .call()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        const [id, name, accountHash, role] = res
        store.dispatch(setAccountInfo({ id, name, accountHash, role }))
        if (accountHash === metaMask.account) {
          setLogin(true)
        } else {
          setLogin(false)
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err)
        store.dispatch(setAccountInfo({ id: '', name: '', accountHash: '', role: 'None' }))
        setLogin(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaMask.account])

  if (metaMask.account === userAccountHash && !login) {
    setLogin(true)
    return login
  }

  return login
}
