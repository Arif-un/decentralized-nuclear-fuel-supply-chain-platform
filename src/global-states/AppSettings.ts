import { createSlice } from '@reduxjs/toolkit'

export interface AppSettingsStateType {
  theme: 'light' | 'dark'
}

const initialState: AppSettingsStateType = {
  theme: 'dark',
}

export const AppSettingsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleTheme: (state: AppSettingsStateType) => {
      if (state.theme === 'dark') {
        state.theme = 'light'
      } else {
        state.theme = 'dark'
      }
    },
  },
})

export const { toggleTheme } = AppSettingsSlice.actions
export default AppSettingsSlice.reducer
