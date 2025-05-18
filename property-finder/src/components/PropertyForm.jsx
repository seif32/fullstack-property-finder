import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { listingTypes, propertyTypes } from "../data/dummyData";
import { useGetAllLocations } from "../hooks/location/useGetAllLocations";
import LoadingSpinner from "./LoadingSpinner";

function PropertyForm({ property = null, onSubmit }) {
  const navigate = useNavigate();
  const isEditing = !!property;

  const { data: locations, isLoading } = useGetAllLocations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          propertyType: property.propertyType,
          listingType: property.listingType,
        }
      : {
          title: "",
          description: "",
          price: "",
          location: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          propertyType: "",
          listingType: "",
        },
  });
  if (isLoading) return <LoadingSpinner />;

  const handleFormSubmit = (data) => {
    console.log("Property form submitted:", data);

    if (onSubmit) {
      onSubmit(data);
    } else {
      // Default behavior if no onSubmit is provided
      if (isEditing) {
        console.log(`PUT /api/properties/${property.id} with data:`, data);
        alert("Property updated successfully!");
        navigate(`/properties/${property.id}`);
      } else {
        console.log("POST /api/properties with data:", data);
        alert("Property created successfully!");
        navigate("/my-properties");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Title
            </label>
            <input
              id="title"
              type="text"
              className={`w-full px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              className={`w-full px-4 py-2 border ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white`}
              {...register("propertyType", {
                required: "Property type is required",
              })}
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.propertyType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="listingType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Listing Type
            </label>
            <select
              id="listingType"
              className={`w-full px-4 py-2 border ${
                errors.listingType ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white`}
              {...register("listingType", {
                required: "Listing type is required",
              })}
            >
              <option value="">Select Listing Type</option>
              {listingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.listingType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.listingType.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="border-t border-gray-200 my-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Location & Details
            </h2>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              id="location"
              className={`w-full px-4 py-2 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white`}
              {...register("location", { required: "Location is required" })}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
              {locations.flatMap((location) =>
                location.subLocations.map((subLocation) => (
                  <option key={subLocation.id} value={subLocation.name}>
                    {subLocation.name} ({location.name})
                  </option>
                ))
              )}
            </select>
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                id="price"
                type="number"
                className={`w-full pl-8 pr-4 py-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <input
              id="bedrooms"
              type="number"
              className={`w-full px-4 py-2 border ${
                errors.bedrooms ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
              {...register("bedrooms", {
                required: "Number of bedrooms is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bedrooms.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              className={`w-full px-4 py-2 border ${
                errors.bathrooms ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
              {...register("bathrooms", {
                required: "Number of bathrooms is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bathrooms.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Area (m²)
            </label>
            <input
              id="area"
              type="number"
              className={`w-full px-4 py-2 border ${
                errors.area ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
              {...register("area", {
                required: "Area is required",
                min: { value: 1, message: "Area must be greater than 0" },
              })}
            />
            {errors.area && (
              <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isEditing ? "Update Property" : "Create Property"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
