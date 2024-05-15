import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  ownBoobs: [],
  searchInput: "",
  info: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setUser, setAuthenticated, setSearchInput } = userSlice.actions;

export default userSlice.reducer;
