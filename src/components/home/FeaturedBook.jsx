import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";
import BookError from "../shared/BookError";
import Swal from "sweetalert2";

const FeaturedBook = () => {
  const axiosInstance = useAxios();

  const {
    data: featuredBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredBooks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-book");
      return res.data;
    },
  });

  const handleWishlist = () => {
    Swal.fire({
      icon: 'success',
      title: 'Added to Wishlist',
      text: 'The book has been added to your wishlist'

    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <BookError></BookError>;
  }

  const featuredBook = featuredBooks[0];

  if (!featuredBook) {
    return <Loading></Loading>;
  }

  const id = featuredBook._id;
  const rating = parseFloat(featuredBook.rating || 0);

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-16 bg-gradient-to-r from-base-200 to-stone-600 text-base-content mb-10 md:mb-20 rounded-xl mx-2">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
            Featured Book
          </h2>

          <p className="text-lg md:text-xl text-center text-base-content/70 leading-relaxed mb-8 md:mb-12">
            A standout read chosen for its impact and acclaim
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative group w-[280px] h-[420px] md:w-[320px] md:h-[480px] rounded-lg overflow-hidden">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ maxHeight: "28rem" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x600?text=Reverend+Insanity")
                  }
                />
                <div className="absolute top-3 right-3 bg-accent text-error text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur">
                  Featured
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 flex flex-col h-full">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">
                  {featuredBook.title}
                </h3>
                <p className="text-lg text-accent mb-4">
                  <span className="text-base-content/70">by</span>{" "}
                  {featuredBook.author}
                </p>
              </div>

              <div className="flex items-center gap-1 text-yellow-300 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating) ? "fill-current" : "fill-gray-400"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 text-base-content/80">({rating})</span>
              </div>

              <div
                className="flex-1 overflow-y-auto pr-2 text-base-content/70 leading-relaxed"
                style={{ maxHeight: "12rem" }}
              >
                <p className="whitespace-pre-line">
                  {featuredBook.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  to={`/book/${id}`}
                  className="px-6 py-2.5 bg-accent text-error font-semibold rounded-lg transition shadow text-center border-2 border-accent hover:border-white hover:bg-accent/90 hover:scale-105 duration-300"
                >
                  Read Now
                </Link>
                <button
                  onClick={handleWishlist}
                  className="px-6 py-2.5 border-2 border-white hover:border-primary text-base-content font-semibold rounded-lg bg-info hover:bg-info/90 hover:scale-103 transition duration-300"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;
