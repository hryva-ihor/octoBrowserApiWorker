import userReducer from "./slices/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
