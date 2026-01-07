import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ bookData }) => {
  const id = bookData?._id;
  const title = bookData?.title;
  const author = bookData?.author;
  const genre = bookData?.genre;
  const rating = parseFloat(bookData?.rating?.$numberDouble || bookData?.rating || 0);
  const cover = bookData?.coverImage;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;

    return (
      <div className="flex items-center">
        {[...Array(full)].map((_, i) => (
          <FaStar
            key={`f-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        {[...Array(empty)].map((_, i) => (
          <FaStar
            key={`e-${i}`}
            className="w-4 h-4 fill-gray-200 text-gray-300"
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="bg-base-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-103 flex flex-col h-full">
      <div className="px-4 pt-8 pb-4 flex flex-col h-full">
        {/* Cover */}
        <div className="mb-4 flex justify-center">
          <img
            src={cover}
            alt={title}
            className="w-[80%] max-h-105 object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-end space-y-2">
          <h3 className="font-bold md:text-lg text-base-content line-clamp-2">
            {title}
          </h3>

          <p className="text-xs md:text-sm text-base-content/70">
            by <span className="font-medium">{author}</span>
          </p>

          <div className="flex flex-col md:flex-row items-start justify-start md:items-center md:justify-between gap-1">
            <span className="px-2 py-1 text-[10px] md:text-xs font-medium text-error bg-accent rounded-xl">
              {genre}
            </span>
            {renderStars(rating)}
          </div>
        </div>

        {/* Action */}
        <Link
          to={`/book/${id}`}
          className="block w-full text-center mt-4 px-4 py-2.5 text-sm font-medium text-error bg-primary rounded-lg hover:bg-accent transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
