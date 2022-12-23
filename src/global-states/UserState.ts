import { createSlice } from '@reduxjs/toolkit'

enum Role {
  Admin = 'Admin',
  Supplier = 'Supplier',
  Security = 'Security',
  Importer = 'Importer',
  None = 'None',
}
export interface UserStateType {
  id: string
  name: string
  accountHash: string
  role: Role
}

const initialState: UserStateType = {
  id: '',
  name: '',
  role: Role.None,
  accountHash: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountInfo: (state: UserStateType, action) => {
      state = action.payload
      return state
    },
    // toggleTheme: (state: UserStateType) => {
    // if (state.theme === 'dark') {
    //   state.theme = 'light'
    // } else {
    //   state.theme = 'dark'
    // }
    // },
  },
})
export const { setAccountInfo } = UserSlice.actions
export default UserSlice.reducer
