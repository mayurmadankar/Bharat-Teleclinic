import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedApps: { doctor: true, patient: false },
  title: "",
  message: "",
  redirectUrl: "",
  scheduleType: "now",
  scheduledDateTime: null,
  status: "idle",
  error: null,
  response: null
};

export const submitPushNotification = createAsyncThunk(
  "pushNotification/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
      console.log("Overall data", data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit push notification"
      );
    }
  }
);

const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState,
  reducers: {
    setDoctorSelected(state) {
      console.log("Doctor Selected:", state.selectedApps);
      state.selectedApps = { doctor: true, patient: false };
    },
    setPatientSelected(state) {
      console.log("Patient Selected:", state.selectedApps);
      state.selectedApps = { doctor: false, patient: true };
    },
    setTitle(state, action) {
      console.log("Title:", state.title);
      state.title = action.payload;
    },
    setMessage(state, action) {
      console.log("Message:", state.message);
      state.message = action.payload;
    },
    setRedirectUrl(state, action) {
      state.redirectUrl = action.payload;
      console.log("Url:", state.redirectUrl);
    },
    setScheduleType(state, action) {
      console.log("setScheduleTime :", state.scheduleType);
      state.scheduleType = action.payload;
    },
    setScheduledDateTime(state, action) {
      const val = action.payload;
      state.scheduledDateTime = val ? new Date(val).toISOString() : null;
      console.log("Date and Time :", state.scheduledDateTime);
    },
    resetForm(state) {
      state.selectedApps = { doctor: true, patient: false };
      state.title = "";
      state.message = "";
      state.redirectUrl = "";
      state.scheduleType = "now";
      state.scheduledDateTime = null;
      state.status = "idle";
      state.error = null;
      state.response = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPushNotification.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.response = null;
      })
      .addCase(submitPushNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(submitPushNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Submission failed";
      });
  }
});

export const {
  setDoctorSelected,
  setPatientSelected,
  setTitle,
  setMessage,
  setRedirectUrl,
  setScheduleType,
  setScheduledDateTime,
  resetForm
} = pushNotificationSlice.actions;

export default pushNotificationSlice.reducer;

export const selectPushNotification = (state) => state.pushNotification;
export const selectPushStatus = (state) => state.pushNotification.status;
export const selectPushError = (state) => state.pushNotification.error;
export const selectPushResponse = (state) => state.pushNotification.response;
