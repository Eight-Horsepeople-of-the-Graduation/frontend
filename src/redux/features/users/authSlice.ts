import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../Types/users.types";
// import { dummyUser } from "../../../dummyData";

interface AuthState {
  user?: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    setLogedInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setLogedInUser } = authSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;
