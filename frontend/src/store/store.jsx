import { configureStore } from "@reduxjs/toolkit";
import pushNotificationReducer from "../redux/pushNotofication";

export const store = configureStore({
  reducer: {
    pushNotification: pushNotificationReducer
  }
});

export default store;
