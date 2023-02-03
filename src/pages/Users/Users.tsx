/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { BiTrashAlt, BiUserPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { useMetaMask } from 'metamask-react'

import userContract from '@/data/userContract'

export interface User {
  id?: string
  name: string
  accountHash: string
  role: string
}

export const fetchUser = async (ethereum: any, setUsers: (userArr: User[]) => void) => {
  const usersArr = []
  const userCount = await userContract(ethereum).methods.userId().call()

  for (let i = 1; i <= Number(userCount); i++) {
    const { id, name, accountHash, role } = await userContract(ethereum).methods.users(i).call()
    usersArr.push({ id, name, accountHash, role })
  }
  setUsers(usersArr)
}

export default function Users() {
  const { ethereum, account } = useMetaMask()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUser(ethereum, setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteUser = (id: string, accountHash: string) => {
    userContract(ethereum)
      .methods.deleteUser(id, accountHash)
      .send({ from: account, gas: 3000000 })
      .then((res: any) => {
        if (res.status) {
          fetchUser(ethereum, setUsers)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const updateUserRole = (id: string, name: string, accountHash: string, role: string) => {
    userContract(ethereum)
      .methods.updateUser(id, name, accountHash, role)
      .send({ from: account, gas: 3000000 })
      .then((res: any) => {
        if (res.status) {
          fetchUser(ethereum, setUsers)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mr-1">Users</h1>
        <Link to="/add-user" className="btn btn-sm btn-outline">
          <span className="mr-2">Add User</span>
          <BiUserPlus size={22} />
        </Link>
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Hash</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="font-bold">{user.name} </div>
                </td>
                <td>{user.accountHash}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateUserRole(user.id as string, user.name, user.accountHash, e.target.value)
                    }
                    className="select select-bordered select-sm w-full max-w-xs"
                  >
                    <option disabled value="Admin">
                      Admin
                    </option>
                    <option value="Security">Security</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Importer">Importer</option>
                    <option value="Provider">Provider</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id as string, user.accountHash)}
                    className="btn btn-circle btn-sm btn-outline"
                    type="button"
                  >
                    <BiTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
