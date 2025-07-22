import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPushNotification,
  selectPushStatus,
  selectPushError,
  selectPushResponse,
  setDoctorSelected,
  setPatientSelected,
  setTitle,
  setMessage,
  setRedirectUrl,
  setScheduleType,
  setScheduledDateTime,
  resetForm,
  submitPushNotification
} from "../redux/pushNotification";
import { useState } from "react";

const PushNotification = () => {
  const dispatch = useDispatch();
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [urlError, setUrlError] = useState("");

  const state = useSelector(selectPushNotification);
  const status = useSelector(selectPushStatus);
  const error = useSelector(selectPushError);
  const response = useSelector(selectPushResponse);

  const dateForPicker = state.scheduledDateTime
    ? new Date(state.scheduledDateTime)
    : new Date();

  const submitting = status === "loading";
  const submitSuccess = status === "succeeded";

  const makePayload = () => {
    const applications = [];
    if (state.selectedApps.doctor) applications.push("doctor");
    if (state.selectedApps.patient) applications.push("patient");
    return {
      applications,
      title: state.title.trim(),
      message: state.message.trim(),
      redirectUrl: state.redirectUrl.trim() || null,
      scheduleType: state.scheduleType,
      scheduledAt:
        state.scheduleType === "later" && state.scheduledDateTime
          ? state.scheduledDateTime
          : null
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    // Title validation
    if (!state.title.trim()) {
      setTitleError("Title is required");
      hasError = true;
    } else setTitleError("");

    // Message validation
    if (!state.message.trim()) {
      setMessageError("Message is required");
      hasError = true;
    } else setMessageError("");

    // Redirect URL validation (if entered, must start with http/https)
    if (state.redirectUrl.trim() && !/^https?:\/\//i.test(state.redirectUrl)) {
      setUrlError("Redirect URL must start with http:// or https://");
      hasError = true;
    } else setUrlError("");

    if (hasError) return;

    const payload = makePayload();

    dispatch(submitPushNotification())
      .unwrap()
      .then(() => {
        dispatch(resetForm());
      });
    console.log("Form submitted with data:", payload);
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="flex-1 p-6  min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" rounded-lg p-6 space-y-6 w-full"
      >
        {/* Application */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">
            Choose the Application
          </label>

          <div className="flex gap-5 w-full">
            {/* Doctor Application */}
            <label htmlFor="doctorApp" className="flex-1 cursor-pointer">
              <div
                className={
                  " flex px-4 py-2 rounded-md border items-center justify-between text-sm text-gray-600"
                }
              >
                <p className="text-gray-500">Doctor Application</p>
                <input
                  type="radio"
                  id="doctorApp"
                  name="application"
                  value="doctor"
                  checked={state.selectedApps.doctor}
                  onChange={() => dispatch(setDoctorSelected())}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
              </div>
            </label>

            {/* Patient Application */}
            <label htmlFor="patientApp" className="flex-1 cursor-pointer">
              <div
                className={
                  " flex px-4 py-2 rounded-md border items-center justify-between text-sm text-gray-600"
                }
              >
                <p className="text-gray-500">Patient Application</p>
                <input
                  type="radio"
                  id="patientApp"
                  name="application"
                  value="patient"
                  checked={state.selectedApps.patient}
                  onChange={() => dispatch(setPatientSelected())}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
              </div>
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
            onChange={(e) => {
              dispatch(setTitle(e.target.value));
              if (titleError && e.target.value.trim()) setTitleError("");
            }}
            className={`border px-4 py-2 rounded-md w-full h-[40px] focus:outline-blue-500 ${
              titleError ? "border-red-500" : "border-gray-400"
            }`}
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Message
          </label>
          <textarea
            placeholder="Enter the Message"
            value={state.message}
            onChange={(e) => {
              dispatch(setMessage(e.target.value));
              if (messageError && e.target.value.trim()) setMessageError("");
            }}
            rows={3}
            className={`border px-4 py-2 rounded-md w-full focus:outline-blue-500 resize-y ${
              messageError ? "border-red-500" : "border-gray-400"
            }`}
          />
          {messageError && (
            <p className="text-red-500 text-sm mt-1">{messageError}</p>
          )}
        </div>

        {/* Redirect URL */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Redirect URL
          </label>
          <input
            type="text"
            placeholder="Enter the Redirect URL"
            value={state.redirectUrl}
            onChange={(e) => {
              dispatch(setRedirectUrl(e.target.value));
              if (urlError && /^https?:\/\//i.test(e.target.value))
                setUrlError("");
            }}
            className={`border px-4 py-2 rounded-md w-full h-[40px] focus:outline-blue-500 ${
              urlError ? "border-red-500" : "border-gray-400"
            }`}
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
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
                className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
                className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
              onChange={(date) =>
                dispatch(setScheduledDateTime(date ? date.toISOString() : null))
              }
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
