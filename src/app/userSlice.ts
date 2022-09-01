import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import User from "../types/User";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.concat(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.users.users.values;
export default userSlice.reducer;
