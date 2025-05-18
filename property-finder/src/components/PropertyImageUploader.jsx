"use client";

import { useState } from "react";
import { useAddPropertyImage } from "../hooks/property-image/useAddPropertyImage";
import { useUpdatePropertyImage } from "../hooks/property-image/useUpdatePropertyImage";
import { useDeletePropertyImage } from "../hooks/property-image/useDeletePropertyImage";

// MUI Components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useGetPropertyImages } from "../hooks/property-image/useGetPropertyImages";
import LoadingSpinner from "./LoadingSpinner";

function PropertyImageUploader({ propertyId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addImage, isPending: isAdding } = useAddPropertyImage(propertyId);
  const updateImage = useUpdatePropertyImage(propertyId);
  const deleteImage = useDeletePropertyImage(propertyId);

  const { data: images, isLoading } = useGetPropertyImages(propertyId);

  if (isLoading) return <LoadingSpinner />;

  const handleAddImage = () => {
    setCurrentImage(null);
    setImageUrl("");
    setDescription("");
    setIsPrimary(false);
    setImageError(false);
    setOpenDialog(true);
  };

  const handleEditImage = (image) => {
    setCurrentImage(image);
    setImageUrl(image.imageUrl);
    setDescription(image.description);
    setIsPrimary(image.isPrimary);
    setImageError(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveImage = () => {
    if (!imageUrl) return;

    const imagePayload = {
      propertyId,
      imageUrl,
      description,
      isPrimary,
    };

    if (currentImage) {
      // Update
      updateImage.mutate({
        imageId: currentImage.id,
        imageData: imagePayload,
      });
    } else {
      // Add
      addImage(imagePayload);
    }

    setOpenDialog(false);
  };

  const handleDeleteImage = (imageId) => {
    deleteImage.mutate(imageId);
  };

  const handleSetPrimary = (imageId) => {
    console.log(`PUT /api/property-images/${imageId}/set-primary`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Property Images</h2>
        <button
          onClick={handleAddImage}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col">
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.description || "Property image"}
                className="w-full h-48 object-cover"
              />

              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  Primary
                </div>
              )}

              <div className="p-2 flex justify-between">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="p-1.5 text-gray-600 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Edit image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Delete image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500 truncate">
              {image.description || "No description"}
            </p>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No images added yet</p>
            <button
              onClick={handleAddImage}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              Add First Image
            </button>
          </div>
        )}
      </div>

      {/* MUI Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {currentImage ? "Edit Image" : "Add New Image"}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            size="small"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {/* Image Preview */}
          <Box
            sx={{
              width: "100%",
              height: 200,
              mb: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f5f5f5",
            }}
          >
            {imageUrl && !imageError ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={handleImageError}
              />
            ) : (
              <Box sx={{ textAlign: "center", p: 2 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9e9e9e"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: "0 auto", marginBottom: 8 }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <Typography variant="body2" color="text.secondary">
                  {imageError
                    ? "Image failed to load"
                    : "Image preview will appear here"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Form Fields */}
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageError(false);
            }}
            placeholder="https://example.com/image.jpg"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
            helperText="Enter a valid image URL (JPG, PNG, WebP)"
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Front view, Living room, etc."
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2, bgcolor: "#f8f9fa" }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderColor: "#e0e0e0",
              color: "#616161",
              "&:hover": {
                borderColor: "#bdbdbd",
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveImage}
            disabled={!imageUrl}
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": {
                bgcolor: "#333",
              },
              "&.Mui-disabled": {
                bgcolor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
            startIcon={
              isAdding ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isAdding
              ? "Saving..."
              : currentImage
                ? "Update Image"
                : "Add Image"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PropertyImageUploader;
