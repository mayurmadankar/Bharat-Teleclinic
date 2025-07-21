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
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/push-notification", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit push notification"
      );
    }
  }
);

const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState,
  reducers: {
    toggleDoctor(state) {
      state.selectedApps.doctor = !state.selectedApps.doctor;
    },
    togglePatient(state) {
      state.selectedApps.patient = !state.selectedApps.patient;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setRedirectUrl(state, action) {
      state.redirectUrl = action.payload;
    },
    setScheduleType(state, action) {
      state.scheduleType = action.payload; // 'now' or 'later'
    },
    setScheduledDateTime(state, action) {
      // store as ISO string for serializable state
      const val = action.payload; // Date | string | null
      state.scheduledDateTime = val ? new Date(val).toISOString() : null;
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
  toggleDoctor,
  togglePatient,
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
