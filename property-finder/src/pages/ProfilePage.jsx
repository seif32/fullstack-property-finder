"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useUpdateUser } from "../hooks/user/useUpdateUser";
import { useChangePassword } from "../hooks/user/useChangePassword";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const onSubmit = (data) => {
    updateUser({ userId: user.id, userData: data });
  };

  // const handlePasswordChange = (data) => {
  //   console.log("Password change requested");
  //   // In a real app, you would call an API to change the password
  //   alert("Password changed successfully!");
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Profile</h1>
      <div className="border-b border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-gray-800 text-white text-4xl rounded-full flex items-center justify-center mx-auto mb-4">
              {user.firstName.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-sm text-gray-500 mb-4">
              Member since {new Date().getFullYear()}
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Change Picture
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => handleTabChange(0)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 0
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Personal Information
                </button>
                {/* <button
                  onClick={() => handleTabChange(1)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 1
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={() => handleTabChange(2)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 2
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Preferences
                </button> */}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className={`w-full px-4 py-2 border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className={`w-full px-4 py-2 border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        className={`w-full px-4 py-2 border ${
                          errors.phoneNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

// {
//   activeTab === 1 && (
//     <div>
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         Change Password
//       </h3>
//       <form onSubmit={handleSubmit(handlePasswordChange)}>
//         <div className="space-y-6 mb-6">
//           <div>
//             <label
//               htmlFor="currentPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Current Password
//             </label>
//             <input
//               id="currentPassword"
//               type="password"
//               className={`w-full px-4 py-2 border ${
//                 errors.currentPassword ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//               {...register("currentPassword", {
//                 required: "Current password is required",
//               })}
//             />
//             {errors.currentPassword && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.currentPassword.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               New Password
//             </label>
//             <input
//               id="newPassword"
//               type="password"
//               className={`w-full px-4 py-2 border ${
//                 errors.newPassword ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//               {...register("newPassword", {
//                 required: "New password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters",
//                 },
//               })}
//             />
//             {errors.newPassword && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.newPassword.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Confirm New Password
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               className={`w-full px-4 py-2 border ${
//                 errors.confirmPassword ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//               {...register("confirmPassword", {
//                 required: "Please confirm your password",
//                 validate: (value, formValues) =>
//                   value === formValues.newPassword || "Passwords do not match",
//               })}
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// }

// {
//   activeTab === 2 && (
//     <div>
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//         Notification Preferences
//       </h3>
//       <p className="text-gray-500 mb-6">
//         Manage how you receive notifications and updates
//       </p>

//       <div className="mb-6">
//         {/* Notification preferences would go here */}
//         <p className="text-gray-700">
//           This section would contain notification preferences controls
//         </p>
//       </div>

//       <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
//         Save Preferences
//       </button>
//     </div>
//   );
// }
