import ViewingRequestsList from "../components/ViewingRequestsList";

export default function ViewingRequestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Manage Viewing Requests
      </h1>
      <ViewingRequestsList />
    </div>
  );
}
