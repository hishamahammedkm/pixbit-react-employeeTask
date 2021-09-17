import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { employeesApi } from './services/employee'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeesApi.middleware),
})


setupListeners(store.dispatch)