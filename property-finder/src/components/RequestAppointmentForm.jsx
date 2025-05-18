import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  PencilIcon,
} from "lucide-react";
import { useCreateViewingRequest } from "../hooks/appointment/useCreateViewingRequest";
import { useAuth } from "../auth/AuthContext";

export default function RequestAppointmentForm({ propertyId }) {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.firstName + " " + user?.lastName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const appointmentMutation = useCreateViewingRequest({
    onSuccess: () => {
      setSubmissionStatus("success");
      reset(); // if using react-hook-form
    },
    onError: () => {
      setSubmissionStatus("error");
    },
  });

  const onSubmit = (formData) => {
    setSubmissionStatus("loading");

    const payload = {
      userId: user.id,
      propertyId,
      requestedDateTime: new Date(
        formData.date + "T" + formData.time
      ).toISOString(),
      message: formData.notes || "", // optional field
    };

    console.log("[DEBUG] Payload to backend:", payload);

    appointmentMutation.mutate(payload);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Request a Property Viewing
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Fill out the form below to schedule a viewing appointment
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              className={`pl-10 block w-full rounded-md border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2`}
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`pl-10 block w-full rounded-md border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2`}
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              className={`pl-10 block w-full rounded-md border ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2`}
              placeholder="+1 (555) 123-4567"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: "Invalid phone number format",
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Date and Time Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                className={`pl-10 block w-full rounded-md border ${
                  errors.date ? "border-red-300" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2`}
                min={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "Date is required" })}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="time"
                type="time"
                className={`pl-10 block w-full rounded-md border ${
                  errors.time ? "border-red-300" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2`}
                {...register("time", { required: "Time is required" })}
              />
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Notes Field */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <PencilIcon className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="notes"
              rows={3}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
              placeholder="Any specific questions or requests..."
              {...register("notes")}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submissionStatus === "success" && (
          <div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Your appointment request has been submitted successfully!
            </span>
          </div>
        )}

        {submissionStatus === "error" && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              There was an error submitting your request. Please try again.
            </span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submissionStatus === "loading"}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              submissionStatus === "loading"
                ? "opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            {submissionStatus === "loading" ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Request Appointment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
