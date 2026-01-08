import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading";
import Swal from "sweetalert2";
import BookError from "../components/shared/BookError";
import { useForm } from "react-hook-form";

const BookDetails = () => {
  const [postingComment, setPostingComment] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    data: bookData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookData", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/book/${id}`);
      return res.data;
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6d5ef3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/book/${id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Book has been deleted.",
              confirmButtonColor: "#6d5ef3",
            });
            navigate("/my-books");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete book",
              confirmButtonColor: "#6d5ef3",
            });
          });
      }
    });
  };

  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating || 0);
    const full = Math.floor(ratingValue);
    const empty = 5 - full;

    return (
      <div className="flex items-center gap-1">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`f-${i}`} className="w-5 h-5 text-yellow-400" />
        ))}
        {[...Array(empty)].map((_, i) => (
          <FaStar key={`e-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-700">
          {ratingValue.toFixed(1)}
        </span>
      </div>
    );
  };

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    reset: resetComment,
    formState: { errors: commentErrors },
  } = useForm();

  const {data: comments = [], isLoading: commentsLoading, refetch: refetchComments} = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
        const res = await axiosInstance.get(`/comments/${id}`);
        return res.data
    }
  })

  const handleAddComment = async (data) => {
      if (!user) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login to post a comment',
      confirmButtonColor: '#6d5ef3',
    });
    return;
  }

    setPostingComment(true);

  const newComment = {
    bookId: id,
    userId: user.email,
    userName: user.displayName,
    userPhoto: user.photoURL,
    comment: data.comment,
  };

    try {
    await axiosInstance.post('/comments', newComment);
    
    Swal.fire({
      icon: 'success',
      title: 'Comment Added!',
      text: 'Your comment has been posted successfully',
      confirmButtonColor: '#6d5ef3',
    });
    
    resetComment();
    refetchComments();

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add comment',
      confirmButtonColor: '#6d5ef3',
    });
  } finally {
    setPostingComment(false);
  }
}

  const handleDeleteComment = async (commentId, commentUserId) => {
  if (user.email !== commentUserId) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'You can only delete your own comments',
      confirmButtonColor: '#6d5ef3',
    });
    return;
  }

  const result = await Swal.fire({
    title: 'Delete Comment?',
    text: "This action cannot be undone",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6d5ef3',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Comment has been deleted',
        confirmButtonColor: '#6d5ef3',
      });
      
      refetchComments(); // Refetch comments to update list
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete comment',
        confirmButtonColor: '#6d5ef3',
      });
    }
}
}


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <BookError />;
  }

  const isOwner = user?.email === bookData?.userEmail;

  return (
    <div className="min-h-screen bg-base-300 py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <Link
          to="/all-books"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-base-content mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span className="font-medium">Back to All Books</span>
        </Link>

        {/* Main Content */}
        <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
            {/* Left: Cover Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <img
                  src={bookData.coverImage}
                  alt={bookData.title}
                  className="w-full rounded-lg shadow-lg object-cover max-h-150"
                />

                {/* Action Buttons - Only show if owner */}
                {isOwner && (
                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/update-book/${id}`}
                      className="btn btn-accent text-error flex-1 gap-2"
                    >
                      <FaEdit /> Update
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="btn bg-red-600 flex-1 gap-2 text-error"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Author */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-3 leading-tight">
                  {bookData.title}
                </h1>
                <p className="text-xl text-base-content/70">
                  by{" "}
                  <span className="font-semibold text-base-content/80">
                    {bookData.author}
                  </span>
                </p>
              </div>

              {/* Rating & Genre */}
              <div className="flex flex-wrap items-center gap-4">
                <div>{renderStars(bookData.rating)}</div>
                <div className="h-6 w-px bg-gray-400"></div>
                <span className="px-4 py-2 bg-accent text-base-content/90 rounded-full font-bold">
                  {bookData.genre}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6"></div>

              {/* Summary */}
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-3">
                  Summary
                </h2>
                <p className="text-base-content/70 leading-relaxed text-lg whitespace-pre-line">
                  {bookData.summary}
                </p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-3">
                  Description
                </h2>
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {bookData.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6"></div>

              {/* Book Info */}
              <div className="bg-base-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-base-content mb-4">
                  Book Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaUser className="text-base-content/90" />
                    <span>
                      Added by:{" "}
                      <span className="font-semibold">
                        {bookData.userEmail || "Unknown"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaCalendar className="text-base-content/90" />
                    <span>
                      Added on:{" "}
                      <span className="font-semibold">
                        {bookData.created_at
                          ? new Date(bookData.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Unknown"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 mt-8">
          <h3 className="text-3xl font-bold text-base-content mb-6">
            Comments ({comments.length})
          </h3>

          {/* Add Comment Form */}
          {user ? (
            <form
              onSubmit={handleSubmitComment(handleAddComment)}
              className="mb-8"
            >
              <div className="flex gap-4">
                <div className="avatar flex-shrink-0">
                  <div className="w-12 h-12 rounded-full ring-2 ring-accent">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt={user.displayName}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    {...registerComment("comment", {
                      required: "Comment cannot be empty",
                      minLength: {
                        value: 5,
                        message: "Comment must be at least 5 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Comment cannot exceed 500 characters",
                      },
                    })}
                    placeholder="Share your thoughts about this book..."
                    className="textarea textarea-bordered w-full h-24 resize-none bg-base-100 focus:outline-none focus:border-accent"
                    disabled={postingComment}
                  />
                  {commentErrors.comment && (
                    <p className="text-red-500 text-sm mt-1">
                      {commentErrors.comment.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn btn-accent mt-3 text-base-content"
                    disabled={postingComment}
                  >
                    {postingComment ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Posting...
                      </>
                    ) : (
                      "Post Comment"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-base-100 rounded-lg p-6 mb-8 text-center">
              <p className="text-base-content/70 mb-4">
                Please login to share your thoughts about this book
              </p>
              <Link
                to="/auth/login"
                className="btn btn-accent text-base-content"
              >
                Login to Comment
              </Link>
            </div>
          )}

          {/* Comments List */}
          {commentsLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 bg-base-100 rounded-lg">
              <p className="text-base-content/60 text-lg">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-base-100 rounded-lg p-6 shadow-3d-sm hover:shadow-3d transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* User Avatar */}
                    <div className="avatar flex-shrink-0">
                      <div className="w-12 h-12 rounded-full ring-2 ring-accent">
                        {comment.userPhoto ? (
                          <img src={comment.userPhoto} alt={comment.userName} />
                        ) : (
                          <div className="bg-accent flex items-center justify-center text-base-content">
                            <FaUser />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-base-content text-lg">
                            {comment.userName}
                          </h4>
                          <p className="text-sm text-base-content/60">
                            {new Date(comment.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        {/* Delete button */}
                        {user && user.email === comment.userId && (
                          <button
                            onClick={() =>
                              handleDeleteComment(comment._id, comment.userId)
                            }
                            className="btn btn-ghost btn-sm text-red-500 hover:bg-red-500/10"
                            title="Delete comment"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                      <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
