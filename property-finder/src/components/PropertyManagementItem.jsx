import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPropertyImages } from "../hooks/property-image/useGetPropertyImages";
import { useDeleteProperty } from "../hooks/property/useDeleteProperty";

function PropertyManagementItem({ property }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: images } = useGetPropertyImages(property.id);
  const { mutate: deleteProperty, isPending } = useDeleteProperty();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleEdit = () => {
    navigate(`/properties/${property.id}/edit`);
    setMenuOpen(false);
  };
  const handleManageImages = () => {
    navigate(`/properties/${property.id}/images`);
    setMenuOpen(false);
  };
  const handleView = () => {
    navigate(`/properties/${property.id}`);
    setMenuOpen(false);
  };
  const handleDeleteClick = () => {
    deleteProperty(property.id);
    setMenuOpen(false);
  };
  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    alert("Property deleted successfully!");
  };
  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  const firstImageUrl = images && images.length > 0 ? images[0].imageUrl : null;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row">
        {/* Property Image */}
        <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          {firstImageUrl ? (
            <img
              src={firstImageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="flex-grow p-4 relative">
          <div className="absolute top-4 right-4">
            <div className="relative">
              <button
                onClick={handleMenuToggle}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Property actions"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleView}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Property
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Property
                  </button>
                  <button
                    onClick={handleManageImages}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Manage Images
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete Property
                  </button>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pr-10 mb-2">
            {property.title}
          </h3>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            {property.location}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                property.listingType === "Sale"
                  ? "bg-black text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {property.listingType}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {property.propertyType}
            </span>
          </div>

          <p className="text-lg font-bold text-gray-900 mb-3">
            {formatPrice(property.price)}
            {property.listingType === "Rent" && "/month"}
          </p>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </div>
            <div className="flex items-center">
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </div>
            <div className="flex items-center">{property.area} m²</div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={handleDeleteCancel}
            />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Confirm Deletion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete "{property.title}"? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyManagementItem;
