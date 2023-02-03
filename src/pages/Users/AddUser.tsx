import { useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import { useMetaMask } from 'metamask-react'

import userContract from '@/data/userContract'

import type { User } from './Users'

export default function AddUser() {
  const { ethereum, account } = useMetaMask()
  const navigate = useNavigate()

  const [user, setUser] = useState<User>({
    name: '',
    accountHash: '',
    role: 'Supplier',
  })

  const handleAddUserForm = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser((prev: any) => {
      prev[name] = value
      return { ...prev }
    })
  }

  const addUser = () => {
    const { name, accountHash, role } = user
    if (name && accountHash && role) {
      userContract(ethereum)
        .methods.createUser(name, accountHash, role)
        .send({ from: account, gas: 3000000 })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          if (res.status) {
            navigate('/users')
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }

  return (
    <div>
      <h1 className="text-lg font-bold flex items-center gap-3">
        <Link to="/create-order" className="btn btn-circle btn-sm btn-outline">
          <BiChevronLeft size={22} />
        </Link>
        Add New User
      </h1>
      <br />
      <div className="ml-3">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <br />
        <input
          id="name"
          type="text"
          placeholder="Name here"
          name="name"
          value={user.name}
          onChange={handleAddUserForm}
          className="input input-bordered input-primary w-full max-w-xs mt-1"
        />
        <br />
        <br />
        <label htmlFor="email" className="font-semibold">
          Account Hash
        </label>
        <br />
        <input
          id="email"
          type="text"
          value={user.accountHash}
          placeholder="0xd2XXXXXXXXXX"
          name="accountHash"
          onChange={handleAddUserForm}
          className="input input-bordered input-primary w-full max-w-xs mt-1"
        />
        <br />
        <br />
        <label htmlFor="role" className="font-semibold">
          Role
        </label>
        <br />
        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleAddUserForm}
          className="select select-primary w-full max-w-xs"
        >
          <option value="Security">Security Admin</option>
          <option value="Security-Admin">Security</option>
          <option value="Supplier">Supplier</option>
          <option value="Supplier-Admin">Supplier Admin</option>
          <option value="Importer">Importer</option>
          <option value="Importer-Admin">Importer Admin</option>
          <option value="Provider">Provider</option>
          <option value="Provider-Admin">Provider Admin</option>
        </select>
        <br />
        <br />
        <button className="btn btn-primary w-full max-w-xs" onClick={addUser}>
          Save
        </button>
      </div>
    </div>
  )
}
