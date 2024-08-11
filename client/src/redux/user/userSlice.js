import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const selectUserState = (state) => state.user;
export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
