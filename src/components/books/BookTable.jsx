import React, { useState } from "react";
import { FaStar, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router";

const BookTable = ({ allBooks }) => {
  const [sortedBooks, setSortedBooks] = useState(allBooks);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = () => {
    let sorted;
    if (sortOrder === null || sortOrder === "desc") {
      // Sort ascending
      sorted = [...allBooks].sort((a, b) => {
        const ratingA = parseFloat(a.rating?.$numberDouble || a.rating || 0);
        const ratingB = parseFloat(b.rating?.$numberDouble || b.rating || 0);
        return ratingA - ratingB;
      });
      setSortOrder("asc");
    } else {
      // Sort descending
      sorted = [...allBooks].sort((a, b) => {
        const ratingA = parseFloat(a.rating?.$numberDouble || a.rating || 0);
        const ratingB = parseFloat(b.rating?.$numberDouble || b.rating || 0);
        return ratingB - ratingA;
      });
      setSortOrder("desc");
    }
    setSortedBooks(sorted);
  };

  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating?.$numberDouble || rating || 0);
    const full = Math.floor(ratingValue);
    const empty = 5 - full;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`f-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
        ))}
        {[...Array(empty)].map((_, i) => (
          <FaStar key={`e-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-xs md:text-sm text-gray-600">
          ({ratingValue.toFixed(1)})
        </span>
      </div>
    );
  };

  const displayBooks = sortedBooks.length > 0 ? sortedBooks : allBooks;

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table w-full">
        {/* Table Head - larger */}
        <thead className="bg-base-300 text-base-content hidden md:table-header-group">
          <tr>
            <th className="text-left">Cover</th>
            <th className="text-left">Book Name</th>
            <th className="text-left">Author</th>
            <th className="text-left">Genre</th>
            <th className="text-center">
              <button
                onClick={handleSort}
                className="flex items-center gap-2 mx-auto hover:text-base-content/70 transition-colors"
              >
                Rating
                {sortOrder === "asc" ? (
                  <FaSortUp />
                ) : sortOrder === "desc" ? (
                  <FaSortDown />
                ) : (
                  <FaSort />
                )}
              </button>
            </th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        {/* Table Head - smaller */}
        <thead className="md:hidden">
          <tr>
            <th colSpan="2" className="bg-base-300 text-base-content text-center py-3">
              <div className="flex justify-between items-center px-4">
                <span className="font-semibold">All Books</span>
                <button
                  onClick={handleSort}
                  className="flex items-center gap-2 text-sm"
                >
                  Sort
                  {sortOrder === "asc" ? (
                    <FaSortUp />
                  ) : sortOrder === "desc" ? (
                    <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </button>
              </div>
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {displayBooks.map((book) => (
            <React.Fragment key={book._id}>
              {/* Desktop  */}
              <tr className="bg-base-200 hover:bg-base-300 transition duration-300 hidden md:table-row">
                {/* Cover Image */}
                <td>
                  <div className="w-16 h-20">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                </td>

                {/* Book Name */}
                <td>
                  <div className="font-semibold text-lg text-base-content line-clamp-2">
                    {book.title}
                  </div>
                </td>

                {/* Author */}
                <td>
                  <div className="text-base-content/70">{book.author}</div>
                </td>

                {/* Genre */}
                <td>
                  <span className="text-base-content/70">
                    {book.genre}
                  </span>
                </td>

                {/* Rating */}
                <td>
                  <div className="flex justify-center">
                    {renderStars(book.rating)}
                  </div>
                </td>

                {/* Action */}
                <td>
                  <div className="flex justify-center">
                    <Link
                      to={`/book/${book._id}`}
                      className="btn btn-primary btn-sm text-error"
                    >
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>

              {/* Mobile */}
              <tr className="md:hidden border-b border-gray-200">
                <td colSpan="2" className="p-4">
                  <div className="flex gap-4">
                    {/* Cover Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      {/* Title */}
                      <div>
                        <h3 className="font-semibold text-base-content line-clamp-2 mb-1">
                          {book.title}
                        </h3>

                        {/* Author */}
                        <p className="text-sm text-base-content/70 mb-2">
                          by <span className="font-medium">{book.author}</span>
                        </p>

                        {/* Genre */}
                        <span className="inline-block px-2 py-1 text-xs font-medium text-error bg-accent rounded-full mb-2">
                          {book.genre}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between gap-2">
                        {/* Rating */}
                        <div>{renderStars(book.rating)}</div>

                        {/* Button */}
                        <Link
                          to={`/book/${book._id}`}
                          className="btn btn-primary btn-xs text-error whitespace-nowrap"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;