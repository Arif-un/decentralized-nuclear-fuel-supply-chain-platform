import { Link } from 'react-router-dom'

import { toggleTheme } from '@/global-states/AppSettings'
import useTypedDispatch from '@/hooks/useTypedDispatch'
import useTypedSelector from '@/hooks/useTypedSelector'

export default function Login() {
  const theme = useTypedSelector((state) => state.AppSettingsSlice.theme)
  const dispatch = useTypedDispatch()

  return (
    <div className="h-full flex justify-center items-center dark:bg-slate-900">
      <label className="swap swap-rotate absolute top-3 right-3">
        <input
          aria-label="toggle theme"
          type="checkbox"
          checked={theme === 'dark'}
          onChange={() => dispatch(toggleTheme())}
        />
        <svg className="swap-on fill-current w-6 h-6" viewBox="0 0 24 24">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg className="swap-off fill-current w-6 h-6" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      <div
        className="
      card
      p-3
      w-96
      border
      shadow-md
      border-slate-200
      dark:border-slate-600
      dark:bg-slate-800"
      >
        <h1 className="text-center font-semibold text-lg">Login 🚀</h1>
        <br />
        <label htmlFor="email">Email/User ID</label>
        <input
          id="email"
          type="text"
          placeholder="example@email.com"
          className="input input-bordered focus:outline-2 focus:outline-lime-400 w-full mt-1 mb-2"
        />
        <label htmlFor="email">Password</label>
        <input
          id="email"
          type="password"
          placeholder="Type Password Here..."
          className="input input-bordered focus:outline-2 focus:outline-lime-400 w-full mt-1 mb-3"
        />
        <button className="btn btn-primary mt-4 ">Login</button>
        <div>
          <Link
            to=""
            className="btn btn-link no-underline font-light btn-sm mt-2 px-0 normal-case text-slate-400"
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  )
}