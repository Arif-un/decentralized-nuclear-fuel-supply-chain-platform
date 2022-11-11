import { FiUser } from 'react-icons/fi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { NavLink, Outlet } from 'react-router-dom'

import { toggleTheme } from '@/global-states/AppSettings'
import useTypedDispatch from '@/hooks/useTypedDispatch'
import useTypedSelector from '@/hooks/useTypedSelector'

import css from './Layout.module.css'

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashborad', icon: <MdOutlineSpaceDashboard size={18} /> },
  { to: '/suppliers', label: 'Suppliers' },
  { to: '/users', label: 'Users', icon: <FiUser size={18} /> },
]

export default function Layout() {
  const theme = useTypedSelector((state) => state.AppSettingsSlice.theme)
  const dispatch = useTypedDispatch()
  return (
    <div className="h-full">
      <nav className="px-5 py-3 flex justify-between">
        <div className="flex items-center">
          <img
            className="dark:bg-lime-400 bg-lime-100 rounded-xl p-1 mr-2"
            width={35}
            src="https://svgsilh.com/svg/309911.svg"
            alt="logo"
          />
          <span className="text-xl font-bold">Logo</span>
        </div>

        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            <button className="flex items-center gap-2 mr-3">
              <span className="font-semibold text-sm">User</span>
              <div className="avatar">
                <div className="w-7 mask mask-hexagon">
                  <img alt="avater" src="https://placeimg.com/192/192/people" />
                </div>
              </div>
            </button>
            <ul className="dropdown-content menu p-2 shadow border border-gray-200 dark:border-gray-700 bg-base-100 rounded-box w-52">
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/signout">Sign out</a>
              </li>
            </ul>
          </div>

          <label className="swap swap-rotate">
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
        </div>
      </nav>

      <div className={`flex ${css['main-wrapper']}`}>
        <aside className="px-5 pt-3 h-full">
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `btn btn-ghost text-left justify-start normal-case px-4 mb-2 w-36 flex ${
                      isActive && 'bg-lime-400 hover:bg-lime-500 text-slate-900'
                    }`
                  }
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <main className={`dark:bg-slate-800 rounded-xl p-5 bg-slate-100 ${css.main}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
