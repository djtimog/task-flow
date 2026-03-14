import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { AppDispatch } from "../lib/store";
import { type UserType } from "../lib/type";

type UserState = UserType | null;

const initialState: UserState = null;

export const userSlice = createSlice({
  name: "User",
  initialState: initialState as UserState,
  reducers: {
    setUser: (_, action: PayloadAction<UserType>) => action.payload,
    clearUser: () => null,
  },
});

const { setUser, clearUser } = userSlice.actions;

const initializeUser = (token: string, dispatch: AppDispatch) => {
  localStorage.setItem("token", token);
  const { user }: { user: UserType; iat: number; exp: number } =
    jwtDecode(token);
  dispatch(setUser(user));
};

const getUser = (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const { user }: { user: UserType; iat: number; exp: number } =
      jwtDecode(token);
    dispatch(setUser(user));
  }
};

const removeUser = (dispatch: AppDispatch) => {
  localStorage.clear();
  dispatch(clearUser());
};

export { initializeUser, getUser, removeUser };

export default userSlice.reducer;
