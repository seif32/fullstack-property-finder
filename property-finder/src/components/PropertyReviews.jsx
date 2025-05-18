import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReview } from "../hooks/review/useCreateReview";
import { useAuth } from "../auth/AuthContext";

function PropertyReviews({ reviews, propertyId }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  const { user } = useAuth();
  const isAgent = user.role === "AGENT";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const { mutate: createReview, isLoading: submittingReview } = useCreateReview(
    {
      onSuccess: () => {
        reset();
        setShowReviewForm(false);
      },
    }
  );

  const onSubmit = (data) => {
    const reviewPayload = {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      propertyId,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(), // Optional if backend sets it
    };

    createReview(reviewPayload);

    setLocalReviews([reviewPayload, ...localReviews]);
  };

  const calculateAverageRating = () => {
    if (localReviews.length === 0) return 0;
    const sum = localReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / localReviews.length;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews</h2>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < Math.floor(calculateAverageRating()) ? "fill-current" : "text-gray-300"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {calculateAverageRating().toFixed(1)} ({localReviews.length}{" "}
              {localReviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
        {!isAgent && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mt-4 sm:mt-0 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share Your Experience
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating
                </label>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        register("rating").onChange({
                          target: { name: "rating", value: i + 1 },
                        });
                      }}
                      className="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 ${i < (register("rating").value || 5) ? "fill-current" : "text-gray-300"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className={`w-full px-4 py-2 border ${
                    errors.comment ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
                  {...register("comment", {
                    required: "Please enter your review",
                  })}
                />
                {errors.comment && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {localReviews.length > 0 ? (
        <div className="space-y-8">
          {localReviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <div className="border-t border-gray-200 my-8" />}
              <div className="flex mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mr-3 flex-shrink-0">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {review.userName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to share your experience!
        </p>
      )}
    </div>
  );
}

export default PropertyReviews;
