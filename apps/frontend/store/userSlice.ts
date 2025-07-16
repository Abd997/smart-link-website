import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  token: string | null
  isAuthenticated: boolean
  user: {
    role: string | null
    id: string | null
  }
}

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
  user: {
    role: null,
    id: null,
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        token: string
        user: { role: string; id: string }
      }>
    ) {
      state.token = action.payload.token
      state.isAuthenticated = true
      state.user.role = action.payload.user.role
      state.user.id = action.payload.user.id
    },
    logout(state) {
      state.token = null
      state.isAuthenticated = false
      state.user.role = null
      state.user.id = null
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
