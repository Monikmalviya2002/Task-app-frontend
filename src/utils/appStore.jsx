import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import taskReducer from "../utils/taskSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer, 
  },
});

export default appStore;
