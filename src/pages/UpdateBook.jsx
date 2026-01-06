import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import Loading from "../components/shared/Loading";

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { data: bookData = {}, isLoading, error } = useQuery({
    queryKey: ["bookData", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/book/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (bookData && Object.keys(bookData).length > 0) {
      reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        rating: bookData.rating,
        summary: bookData.summary,
        description: bookData.description,
      });
      setImagePreview(bookData.coverImage);
    }
  }, [bookData, reset]);

  const coverImage = watch("coverImage");

  // Preview new image
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

  const handleUpdateBook = async (data) => {
    try {
      setLoading(true);

      Swal.fire({
        title: "Updating Book...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let coverImageURL = bookData.coverImage; 

      // new image upload
      if (data.coverImage && data.coverImage[0]) {
        const coverImageFile = data.coverImage[0];
        const formData = new FormData();
        formData.append("image", coverImageFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imageResponse = await axios.post(image_API_URL, formData);
        coverImageURL = imageResponse.data.data.url;
      }

      // updated book data
      const updatedBookData = {
        title: data.title,
        author: data.author,
        rating: parseFloat(data.rating),
        summary: data.summary,
        description: data.description,
        coverImage: coverImageURL,
        genre: data.genre,
      };

      // update api call
      const response = await axiosInstance.patch(`/update-book/${id}`, updatedBookData);

      console.log("Book updated successfully:", response.data);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Book updated successfully! 📚",
        confirmButtonColor: "#6d5ef3",
      }).then(() => {
        navigate(`/book/${id}`);
      });
    } catch (error) {
      console.error("Error updating book:", error);

      let errorMessage = "Failed to update book. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to update book";
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

  if (!isLoading && bookData.userEmail !== user?.email) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You can only update your own books",
      confirmButtonColor: "#6d5ef3",
    }).then(() => {
      navigate("/all-books");
    });
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Error Loading Book
          </h2>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 w-[90%] max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-2">
          Update Book
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Update the details of "{bookData.title}"
        </p>

        <form onSubmit={handleSubmit(handleUpdateBook)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Book Title <span className="text-red-500">*</span>
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
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
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
              <p className="text-error text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Genre */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Genre <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                {...register("genre", {
                  required: "Please select a genre",
                })}
                className="select select-bordered w-full focus:outline-none focus:border-secondary"
                disabled={loading}
              >
                <option value="" disabled>
                  Select genre
                </option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Dark-fantasy">Dark-fantasy</option>
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
                <p className="text-error text-sm mt-1">{errors.genre.message}</p>
              )}
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
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
                <p className="text-error text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
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
              <p className="text-error text-sm mt-1">{errors.summary.message}</p>
            )}
            <label className="label">
              <span className="label-text-alt text-gray-500">
                {watch("summary")?.length || 0} / 200 characters
              </span>
            </label>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
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
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
            <label className="label">
              <span className="label-text-alt text-gray-500">
                {watch("description")?.length || 0} / 1000 characters
              </span>
            </label>
          </div>

          {/* Cover Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Cover Image
              </span>
              <span className="label-text-alt text-gray-500">
                Leave empty to keep current image
              </span>
            </label>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <label
                className={`flex-1 ${
                  loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-secondary transition-colors duration-300 text-center">
                  <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload new image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("coverImage")}
                  className="hidden"
                  disabled={loading}
                />
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
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
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary flex-1 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                "Update Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;