import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { AppDispatch } from "../lib/store";
import { type UserType } from "../lib/type";
import { getUserById } from "../services/user.service";
import { userExtractor } from "../lib/token";

type UserState = UserType | null;

const initialState: UserState = null;

export const userSlice = createSlice({
  name: "User",
  initialState: initialState as UserState,
  reducers: {
    setUser: (_, action: PayloadAction<UserType>) => action.payload,
    clearUser: () => null,
    // updateUserProject: () => action

    //add a upate user project function
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
  const user = userExtractor();
  if (user) {
    dispatch(setUser(user));
  }
};

const removeUser = (dispatch: AppDispatch) => {
  localStorage.clear();
  dispatch(clearUser());
};

const refetchUser = async (user: UserType | null, dispatch: AppDispatch) => {
  const tokenUser = user;
  if (tokenUser) {
    const user: UserType = await getUserById(tokenUser.id);

    if (JSON.stringify(user) === JSON.stringify(tokenUser)) return null;

    dispatch({ type: "User/setUser", payload: user });
  }
};

export { initializeUser, getUser, removeUser, refetchUser };

export default userSlice.reducer;
