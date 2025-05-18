"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  CloudyIcon as PendingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpDownIcon,
  HomeIcon,
  MessageSquareIcon,
  UserIcon,
  BellIcon,
  RefreshCwIcon,
  LockIcon,
} from "lucide-react";
import { useGetViewingRequestsByAgent } from "../hooks/appointment/useGetViewingRequestsByAgent";
import { useUpdateViewingRequestStatus } from "../hooks/appointment/useUpdateViewingRequestStatus";
import { useAuth } from "../auth/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

// Badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200 shadow-sm",
    APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm",
    DECLINED: "bg-rose-100 text-rose-800 border-rose-200 shadow-sm",
  };

  const statusIcons = {
    PENDING: <PendingIcon className="h-4 w-4 mr-1" />,
    APPROVED: <CheckIcon className="h-4 w-4 mr-1" />,
    DECLINED: <XIcon className="h-4 w-4 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {statusIcons[status]}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

export default function ViewingRequestsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user } = useAuth();
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useGetViewingRequestsByAgent(user?.id);

  const updateStatusMutation = useUpdateViewingRequestStatus(user?.id);

  const handleStatusChange = (requestId, newStatus) => {
    updateStatusMutation.mutate({ requestId, status: newStatus });
  };

  const toggleRequestDetails = (requestId) => {
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refetch().finally(() => {
      setTimeout(() => setIsRefreshing(false), 500);
    });
  };

  const filteredRequests =
    requests?.filter((r) => {
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      const matchesSearch =
        r.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toString().includes(searchTerm);
      return matchesStatus && matchesSearch;
    }) ?? [];

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const aDate = new Date(a.requestedDateTime);
    const bDate = new Date(b.requestedDateTime);
    if (sortOrder === "newest") return bDate - aDate;
    if (sortOrder === "oldest") return aDate - bDate;
    return 0;
  });

  const formatDate = (datetime) => new Date(datetime).toLocaleDateString();
  const formatTime = (datetime) =>
    new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Count requests by status
  const statusCounts = requests?.reduce(
    (acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    },
    { PENDING: 0, APPROVED: 0, DECLINED: 0 }
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md shadow-sm">
        <p className="flex items-center">
          <XIcon className="h-5 w-5 mr-2" />
          Error loading viewing requests. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Viewing Requests</h2>
            <p className="text-blue-100 mt-1">
              Manage and respond to property viewing appointments
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="Refresh requests"
          >
            <RefreshCwIcon
              className={`h-5 w-5 text-white ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-amber-500/20 rounded-lg mr-3">
                <PendingIcon className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Pending</p>
                <p className="text-xl font-bold">
                  {statusCounts?.PENDING || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-500/20 rounded-lg mr-3">
                <CheckIcon className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Approved</p>
                <p className="text-xl font-bold">
                  {statusCounts?.APPROVED || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center">
              <div className="p-2 bg-rose-500/20 rounded-lg mr-3">
                <XIcon className="h-5 w-5 text-rose-300" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Declined</p>
                <p className="text-xl font-bold">
                  {statusCounts?.DECLINED || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="Search by message or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="DECLINED">Declined</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDownIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notice about final decisions */}
      <div className="bg-blue-50 border-b border-blue-100 px-5 py-3">
        <div className="flex items-center text-blue-700 text-sm">
          <LockIcon className="h-4 w-4 mr-2" />
          <p>
            <strong>Note:</strong> Approving or declining a request is final and
            cannot be undone.
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="divide-y divide-gray-100">
        {sortedRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <BellIcon className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No requests found
            </h3>
            <p className="text-gray-500 max-w-md">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters to see more results."
                : "New viewing requests will appear here when clients submit them."}
            </p>
          </div>
        ) : (
          sortedRequests.map((req) => (
            <div key={req.id} className="hover:bg-gray-50 transition-colors">
              <div
                className="p-5 cursor-pointer"
                onClick={() => toggleRequestDetails(req.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                      <HomeIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">
                          Request #{req.id}
                        </h3>
                        <StatusBadge status={req.status} />
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span>User ID: {req.userId}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <HomeIcon className="h-4 w-4 mr-1" />
                        <span>Property ID: {req.propertyId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(req.requestedDateTime)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {formatTime(req.requestedDateTime)}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-1 rounded-full">
                      {expandedRequestId === req.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRequestId === req.id && (
                <div className="px-5 pb-5 pt-0">
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Request Details
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <MessageSquareIcon className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Message
                              </p>
                              <p className="text-sm text-gray-600">
                                {req.message || "No message provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Timeline
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <CalendarIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Created
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(req.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <ClockIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Requested Time
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(
                                  req.requestedDateTime
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Only show for PENDING requests */}
                    {req.status === "PENDING" ? (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(req.id, "APPROVED");
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                        >
                          <CheckIcon className="h-4 w-4 mr-2" />
                          Approve Request
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(req.id, "DECLINED");
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                        >
                          <XIcon className="h-4 w-4 mr-2" />
                          Decline Request
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <LockIcon className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="text-sm text-gray-500">
                          This request has been{" "}
                          <span className="font-medium lowercase">
                            {req.status.charAt(0) +
                              req.status.slice(1).toLowerCase()}
                          </span>
                          . Decisions are final and cannot be changed.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination placeholder - could be implemented if needed */}
      {sortedRequests.length > 0 && (
        <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{sortedRequests.length}</span>{" "}
            requests
          </div>
        </div>
      )}
    </div>
  );
}
