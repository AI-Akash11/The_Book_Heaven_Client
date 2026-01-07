import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaArrowLeft, FaEdit, FaTrash, FaUser, FaCalendar } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import Loading from '../components/shared/Loading';
import Swal from 'sweetalert2';
import BookError from '../components/shared/BookError';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: bookData = {}, isLoading, error } = useQuery({
    queryKey: ['bookData', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/book/${id}`);
      return res.data;
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6d5ef3',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/book/${id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Book has been deleted.',
              confirmButtonColor: '#6d5ef3',
            });
            navigate('/my-books');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete book',
              confirmButtonColor: '#6d5ef3',
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <BookError/>
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
                  by <span className="font-semibold text-base-content/80">{bookData.author}</span>
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
                <h2 className="text-2xl font-bold text-base-content mb-3">Summary</h2>
                <p className="text-base-content/70 leading-relaxed text-lg whitespace-pre-line">
                  {bookData.summary}
                </p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-3">Description</h2>
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {bookData.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6"></div>

              {/* Book Info */}
              <div className="bg-base-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-base-content mb-4">Book Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaUser className="text-base-content/90" />
                    <span>
                      Added by: <span className="font-semibold">{bookData.userEmail || 'Unknown'}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaCalendar className="text-base-content/90" />
                    <span>
                      Added on:{' '}
                      <span className="font-semibold">
                        {bookData.created_at
                          ? new Date(bookData.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Unknown'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;