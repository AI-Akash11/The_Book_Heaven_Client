import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const BookForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const coverImage = watch("coverImage");

  // Preview image
  useEffect(() => {
    if (coverImage && coverImage[0]) {
      const file = coverImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [coverImage]);

  const handleAddBook = async (data) => {
    try {
      setLoading(true);

      Swal.fire({
        title: "Adding Book...",
        text: "Please wait while we upload your book",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload image
      const coverImageFile = data.coverImage[0];
      const formData = new FormData();
      formData.append("image", coverImageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageResponse = await axios.post(image_API_URL, formData);
      const coverImageURL = imageResponse.data.data.url;

      const bookData = {
        title: data.title,
        author: data.author,
        rating: parseFloat(data.rating),
        summary: data.summary,
        description: data.description,
        coverImage: coverImageURL,
        genre: data.genre,
        created_at: new Date(),
        userEmail: user.email,
        userName: user.displayName,
      };

      const response = await axiosInstance.post("/add-book", bookData);

      console.log("Book added successfully:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Book added successfully! 📚",
        confirmButtonColor: "#6d5ef3",
        confirmButtonText: "View My Books",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/my-books");
        }
      });

      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding book:", error);

      let errorMessage = "Failed to add book. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to add book";
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "#6d5ef3",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-200 rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-2">
        Add New Book
      </h2>
      <p className="text-center text-base-content/70 mb-8">
        Fill in the details to add a book to the collection
      </p>

      <form onSubmit={handleSubmit(handleAddBook)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">
              Book Title <span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Book title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters",
              },
            })}
            placeholder="Enter book title"
            className="input input-bordered w-full focus:outline-none focus:border-secondary"
            disabled={loading}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">
              Author Name <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("author", {
              required: "Author name is required",
              minLength: {
                value: 2,
                message: "Author name must be at least 2 characters",
              },
            })}
            placeholder="Enter author name"
            className="input input-bordered w-full focus:outline-none focus:border-secondary"
            disabled={loading}
          />
          {errors.author && (
            <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Genre & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Genre */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Genre <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              {...register("genre", {
                required: "Please select a genre",
              })}
              className="select select-bordered w-full focus:outline-none focus:border-secondary"
              defaultValue=""
              disabled={loading}
            >
              <option value="" disabled>
                Select genre
              </option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Adventure">Adventure</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Classic">Classic</option>
              <option value="Poetry">Poetry</option>
              <option value="Other">Other</option>
            </select>
            {errors.genre && (
              <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>
            )}
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Rating (1-5) <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              {...register("rating", {
                required: "Rating is required",
                min: {
                  value: 1,
                  message: "Rating must be at least 1",
                },
                max: {
                  value: 5,
                  message: "Rating cannot exceed 5",
                },
              })}
              placeholder="Rate 1 to 5"
              step="0.1"
              className="input input-bordered w-full focus:outline-none focus:border-secondary"
              disabled={loading}
            />
            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">
              Summary <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 20,
                message: "Summary must be at least 20 characters",
              },
              maxLength: {
                value: 200,
                message: "Summary cannot exceed 200 characters",
              },
            })}
            placeholder="Write a brief summary of the book"
            className="textarea textarea-bordered h-24 w-full focus:outline-none focus:border-secondary"
            disabled={loading}
          />
          {errors.summary && (
            <p className="text-red-400 text-sm mt-1">{errors.summary.message}</p>
          )}
          <label className="label">
            <span className="label-text-alt text-base-content/70">
              {watch("summary")?.length || 0} / 200 characters
            </span>
          </label>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">
              Description <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 30,
                message: "Description must be at least 30 characters",
              },
              maxLength: {
                value: 1000,
                message: "Description cannot exceed 1000 characters",
              },
            })}
            placeholder="Write a detailed description of the book"
            className="textarea textarea-bordered h-40 w-full focus:outline-none focus:border-secondary"
            disabled={loading}
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
          <label className="label">
            <span className="label-text-alt text-base-content/70">
              {watch("description")?.length || 0} / 1000 characters
            </span>
          </label>
        </div>

        {/* Cover Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">
              Cover Image <span className="text-red-500">*</span>
            </span>
          </label>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            {/* Upload Button */}
            <label
              className={`flex-1 ${
                loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-secondary transition-colors duration-300 text-center">
                <FiUpload className="mx-auto text-4xl text-base-content/60 mb-2" />
                <p className="text-sm text-base-content/60 mb-1">
                  Click to upload cover image
                </p>
                <p className="text-xs text-base-content/70">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("coverImage", {
                  required: "Cover image is required",
                  validate: {
                    fileSize: (files) =>
                      files[0]?.size <= 5 * 1024 * 1024 ||
                      "Image size must be less than 5 MB",
                    fileType: (files) =>
                      files[0]?.type.startsWith("image/") ||
                      "Only image files are allowed",
                  }
                })}
                className="hidden"
                disabled={loading}
              />
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="flex-shrink-0">
                <p className="text-sm font-semibold text-base-content/70 mb-2">
                  Preview:
                </p>
                <div className="w-32 h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          {errors.coverImage && (
            <p className="text-red-400 text-sm mt-1">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full text-error text-lg hover:bg-primary/90 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Adding Book...
              </>
            ) : (
              "Add Book to Collection"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
