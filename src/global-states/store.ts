import { configureStore } from '@reduxjs/toolkit'

import AppSettingsSlice from './AppSettings'

const store = configureStore({
  reducer: { AppSettingsSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch = typeof store.dispatch
export default store
