import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useMetaMask } from 'metamask-react'

import { setAccountInfo } from '@/global-states/UserState'
import useTypedSelector from '@/hooks/useTypedSelector'

import userContract from '../data/userContract'
import store from '../global-states/store'

export default function useUserLogin() {
  const metaMask = useMetaMask()
  const userAccountHash = useTypedSelector((state) => state.UserSlice.accountHash)
  const navigate = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    if (metaMask.status === 'initializing') {
      if (loc.pathname !== '/login') {
        navigate('/login')
        return
      }
      return
    }
    if (!metaMask.ethereum && metaMask.status !== 'connected') {
      if (loc.pathname !== '/login') {
        navigate('/login')
      }
      return undefined
    }
    if (metaMask.account === userAccountHash) {
      return
    }

    userContract(metaMask.ethereum)
      .methods.getUserByAccountHash(metaMask.account)
      .call()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        const [id, name, accountHash, role] = res
        console.log('response', res, metaMask.account)
        store.dispatch(setAccountInfo({ id, name, accountHash, role }))
        if (accountHash && loc.pathname === '/login') {
          navigate('/dashboard')
        } else if (!accountHash && loc.pathname !== '/login') {
          navigate('/login')
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err)
        if (userAccountHash === '') {
          return
        }
        store.dispatch(setAccountInfo({ id: '', name: '', accountHash: '', role: 'None' }))
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaMask.account, userContract])
}
