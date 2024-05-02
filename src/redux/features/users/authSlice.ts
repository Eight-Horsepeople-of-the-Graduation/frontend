import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../Types/userTypes";
import { dummyUser } from "../../../dummyData";

interface AuthState {
  user?: User | null;
}

const initialState: AuthState = {
  user: dummyUser,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // ? Logout the user by returning the initial state
    logout: () => initialState,
    // Save the user's info
    userInfo: (state, action: PayloadAction<AuthState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.user;
    },
  },
});

export const { logout, userInfo } = authSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;
