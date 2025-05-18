"use client";

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useGetAllUsers } from "../hooks/user/useGetAllUsers";
import { usePromoteAgent } from "../hooks/user/usePromoteAgent";

export default function AdminUserManagement() {
  const { user } = useAuth();
  const { data: users = [], isLoading, isError } = useGetAllUsers();
  const { promoteToAgent, isPending } = usePromoteAgent();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  const handlePromote = (id) => {
    promoteToAgent(id, {
      onSuccess: () => {
        // alert("User promoted to AGENT");
      },
      onError: () => {
        alert("Failed to promote");
      },
    });
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      searchTerm === "" ||
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "ALL" || u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // Count users by role
  const userCounts = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { ADMIN: 0, AGENT: 0, USER: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-2 text-gray-600">Manage user roles and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
              <p className="text-2xl font-semibold text-gray-900">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Agents</h2>
              <p className="text-2xl font-semibold text-gray-900">
                {userCounts.AGENT || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-50 text-purple-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Regular Users
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {userCounts.USER || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-shrink-0">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="AGENT">Agent</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* User List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Failed to load users. Please try again later.</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No users found
          </h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-lg">
                    {u.firstName.charAt(0)}
                    {u.lastName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {u.firstName} {u.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{u.email}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : u.role === "AGENT"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  {u.role === "USER" && (
                    <button
                      onClick={() => handlePromote(u.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Promoting...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="-ml-0.5 mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                          Promote to Agent
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`h-1 w-full ${
                  u.role === "ADMIN"
                    ? "bg-purple-500"
                    : u.role === "AGENT"
                      ? "bg-green-500"
                      : "bg-blue-500"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
