import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 
import { authApi } from "@/store/services";

interface AuthState {
  profile: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>) {
      state.profile = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearProfile(state) {
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.profile = action.payload;
        state.isAuthenticated = !!action.payload;
      },
    );
  },
});

export const { setProfile, clearProfile } = authSlice.actions;
export default authSlice.reducer;
