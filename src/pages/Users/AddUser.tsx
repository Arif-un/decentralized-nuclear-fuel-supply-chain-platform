export default function AddUser() {
  return (
    <div>
      <h1 className="text-lg font-bold">Add New User</h1>
      <br />

      <div className="ml-3">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <br />
        <input
          id="name"
          type="text"
          placeholder="Your name here"
          className="input input-bordered input-primary w-full max-w-xs mt-1"
        />
        <br />
        <br />
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <br />
        <input
          id="email"
          type="email"
          placeholder="example@mail.com"
          className="input input-bordered input-primary w-full max-w-xs mt-1"
        />
        <br />
        <br />
        <label htmlFor="role" className="font-semibold">
          Role
        </label>
        <br />
        <select id="role" className="select select-primary w-full max-w-xs">
          <option>Security</option>
          <option>Supplier</option>
        </select>
      </div>
    </div>
  )
}
