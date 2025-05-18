import { useParams } from "react-router-dom";
import RequestAppointmentForm from "../components/RequestAppointmentForm";

export default function RequestAppointmentPage() {
  const { propertyId } = useParams(); // dynamically from route

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Request a Property Viewing
      </h1>
      <RequestAppointmentForm propertyId={Number(propertyId)} />
    </div>
  );
}
