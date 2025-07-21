import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPushNotification,
  selectPushStatus,
  selectPushError,
  selectPushResponse,
  toggleDoctor,
  togglePatient,
  setTitle,
  setMessage,
  setRedirectUrl,
  setScheduleType,
  setScheduledDateTime,
  resetForm,
  submitPushNotification
} from "../redux/pushNotofication";

const PushNotification = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectPushNotification);
  const status = useSelector(selectPushStatus);
  const error = useSelector(selectPushError);
  const response = useSelector(selectPushResponse);

  const dateForPicker = state.scheduledDateTime
    ? new Date(state.scheduledDateTime)
    : new Date();

  const submitting = status === "loading";
  const submitSuccess = status === "succeeded";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.selectedApps.doctor && !state.selectedApps.patient) {
      alert("Select at least one application.");
      return;
    }
    if (!state.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!state.message.trim()) {
      alert("Message is required.");
      return;
    }
    if (
      state.redirectUrl.trim() &&
      !/^https?:\/\//i.test(state.redirectUrl.trim())
    ) {
      alert("Redirect URL must start with http:// or https://");
      return;
    }
    if (state.scheduleType === "later" && !state.scheduledDateTime) {
      alert("Please choose date & time.");
      return;
    }

    dispatch(submitPushNotification())
      .unwrap()
      .then((data) => {
        if (onSuccess) onSuccess(data);
        // optional reset after success
        dispatch(resetForm());
      })
      .catch(() => {
        /* error handled in slice */
      });
  };

  const handleCancel = () => {
    dispatch(resetForm());
    if (onCancel) onCancel();
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6 w-full"
      >
        {/* Application */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Choose the Application
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={state.selectedApps.doctor}
                onChange={() => dispatch(toggleDoctor())}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              Doctor Application
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={state.selectedApps.patient}
                onChange={() => dispatch(togglePatient())}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              Patient Application
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter the Title"
            value={state.title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            className="border border-gray-400 px-4 py-2 rounded-md w-11/12 h-[40px] focus:outline-blue-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Message
          </label>
          <textarea
            placeholder="Enter the Message"
            value={state.message}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            rows={3}
            className="border border-gray-400 px-4 py-2 rounded-md w-11/12 focus:outline-blue-500 resize-y"
          />
        </div>

        {/* Redirect URL */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Redirect URL
          </label>
          <input
            type="text"
            placeholder="Enter the Redirect URL"
            value={state.redirectUrl}
            onChange={(e) => dispatch(setRedirectUrl(e.target.value))}
            className="border border-gray-400 px-4 py-2 rounded-md w-11/12 h-[40px] focus:outline-blue-500"
          />
        </div>

        {/* Timing */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Schedule Option
          </label>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="scheduleType"
                value="later"
                checked={state.scheduleType === "later"}
                onChange={() => dispatch(setScheduleType("later"))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              Schedule Later
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="scheduleType"
                value="now"
                checked={state.scheduleType === "now"}
                onChange={() => dispatch(setScheduleType("now"))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              Send Now
            </label>
          </div>
        </div>

        {/* DatePicker (conditional) */}
        {state.scheduleType === "later" && (
          <div className="mt-2">
            <label className="block text-gray-600 mb-2 font-medium">
              Select Date & Time
            </label>
            <DatePicker
              selected={dateForPicker}
              onChange={(date) => dispatch(setScheduledDateTime(date))}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border rounded focus:outline-blue-500"
              minDate={new Date()}
            />
          </div>
        )}

        {/* Error / Success Messages */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {submitSuccess && (
          <p className="text-green-600 text-sm">
            Push notification created successfully!
          </p>
        )}
        {response && submitSuccess && (
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto max-h-40">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={submitting}
            className="bg-[#D9D9D9] px-4 py-2 rounded hover:bg-gray-300 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PushNotification;
