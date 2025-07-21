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

    dispatch(submitPushNotification())
      .unwrap()
      .then((data) => {
        if (onSuccess) onSuccess(data);
        dispatch(resetForm());
      });
    console.log("Form submitted with data:");
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
          <div className="flex gap-32">
            {/* Doctor Application Button */}
            <div
              onClick={() => dispatch(toggleDoctor())}
              className={`px-4 py-2 rounded-md border cursor-pointer w-5/12 ${
                state.selectedApps.doctor
                  ? " text-gray border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Doctor Application
            </div>

            {/* Patient Application Button */}
            <div
              onClick={() => dispatch(togglePatient())}
              className={`px-4 py-2 rounded-md border cursor-pointer w-5/12 ${
                state.selectedApps.patient
                  ? " text-gray border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Patient Application
            </div>
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
