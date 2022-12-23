import { configureStore } from '@reduxjs/toolkit'

import AppSettingsSlice from './AppSettings'
import UserSlice from './UserState'

const store = configureStore({
  reducer: { AppSettingsSlice, UserSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch = typeof store.dispatch
export default store
