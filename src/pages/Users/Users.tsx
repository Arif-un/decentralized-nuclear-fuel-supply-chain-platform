import { BiUserPlus } from 'react-icons/bi'

// import Modal from '@/components/Modal/Modal'

// const users = [
//   { id: 1, name: 'first name', role: 'admin', created_at: '12-12-2022' },
//   { id: 2, name: 'another name', role: 'supplier', created_at: '10-10-2022' },
// ]

export default function Users() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mr-1">Users</h1>
        <button type="button" className="btn btn-sm btn-outline">
          <span className="mr-2">Add User</span>
          <BiUserPlus size={22} />
        </button>
      </div>
      <div className="overflow-x-auto w- mt-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <Modal title="Add user" open>
        asdfasdfsadfasdf
        asdfasdfasdf
      </Modal> */}
    </div>
  )
}
