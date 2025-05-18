import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const { email, password, ...userDetails } = data;
    await signUp(email, password, userDetails);
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
              Create account
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
              Sign up to get started
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                    placeholder="First name"
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
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                    placeholder="Last name"
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
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                  placeholder="Enter your email"
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

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+-]+$/,
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors`}
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
