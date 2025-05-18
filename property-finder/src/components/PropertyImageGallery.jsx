"use client";

import { useState } from "react";

function PropertyImageGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* Main image */}
        <div className="md:col-span-8">
          <div
            onClick={() => handleOpen(0)}
            className="h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer relative hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black/10"
          >
            <img
              src={images[0]?.imageUrl || "/placeholder.svg"}
              alt={images[0]?.description || "Property main image"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="md:col-span-4">
          <div className="grid grid-cols-2 gap-2 h-full">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={image.id || index}
                onClick={() => handleOpen(index + 1)}
                className="h-32 md:h-[calc(48%-4px)] rounded-lg overflow-hidden cursor-pointer relative hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black/10"
              >
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={image.description || `Property image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                    +{images.length - 5} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-screen image modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={handleClose}
        >
          <div
            className="relative max-w-5xl w-[90%] max-h-[90vh] bg-white rounded-lg p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]?.imageUrl || "/placeholder.svg"}
              alt={
                images[selectedIndex]?.description ||
                `Property image ${selectedIndex + 1}`
              }
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Previous button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyImageGallery;
