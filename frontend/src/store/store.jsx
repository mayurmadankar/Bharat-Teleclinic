import { configureStore } from "@reduxjs/toolkit";
import pushNotificationReducer from "../redux/pushNotification";

export const store = configureStore({
  reducer: {
    pushNotification: pushNotificationReducer
  }
});

export default store;
