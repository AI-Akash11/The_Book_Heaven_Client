import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const FeaturedBook = () => {
  const handleWishlist = () => {
    toast.success("Book Added to Wishlist");
  };
  const featuredBook = {
    _id: { $oid: "69121d220448341e1c0a8fbb" },
    title: "Reverend Insanity",
    author: "Gu Zhen Ren",
    coverImage: "https://i.ibb.co.com/DP2bjbkR/reverend-insanity.jpg",
    description:
      "Reverend Insanity follows Fang Yuan, a 500-year-old demonic cultivator reborn into his youth after his downfall. In a world where magical Gu insects determine power, he wields intelligence, cruelty, and cunning to climb the ranks of cultivation once again. Unlike typical heroes, Fang Yuan rejects all notions of good and evil, embracing pure pragmatism.\n\nThe story explores themes of destiny, free will, and human nature through Fang Yuan’s relentless struggle against the heavens themselves. His every move challenges the ideals of morality, showing that survival often demands cruelty.\n\nSet in a vast and detailed world filled with clans, sects, and mysterious Gu, the novel’s depth lies not in battles alone, but in psychological warfare and philosophical musings. Fang Yuan’s ambition knows no limits—he seeks to live forever, even if the universe must burn for it.",
    genre: "Dark Fantasy",
    rating: 4.9,
    summary:
      "A ruthless cultivator defies heaven, morality, and fate itself in his pursuit of eternal freedom and immortality.",
    userEmail: "akash1437aliimam@gmail.com",
    created_at: "2025-11-12T12:00:00Z",
  };

  const id = featuredBook._id?.$oid || featuredBook._id;
  const rating = parseFloat(featuredBook.rating || 0);

  return (
    <section className="pt-12 pb-16 md:pb-20 bg-gradient-to-r from-secondary to-primary text-white mb-20 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">
            Featured Book
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative group">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="w-full max-w-sm h-auto rounded-lg shadow-2xl object-cover transform transition-transform duration-300 group-hover:scale-105"
                  style={{ maxHeight: "28rem" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x600?text=Reverend+Insanity")
                  }
                />
                <div className="absolute -top-3 -right-3 bg-accent text-primary font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                  This Week
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 flex flex-col h-full">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">
                  {featuredBook.title}
                </h3>
                <p className="text-lg text-accent mb-4">
                  by {featuredBook.author}
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
                <span className="ml-2 text-teal-100">({rating})</span>
              </div>

              <div
                className="flex-1 overflow-y-auto pr-2 text-teal-50 text-base leading-relaxed"
                style={{ maxHeight: "12rem" }}
              >
                <p className="whitespace-pre-line">
                  {featuredBook.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  to={`/book-details/${id}`}
                  className="px-6 py-2.5 bg-accent text-primary font-semibold rounded-lg transition shadow text-center border-2 border-accent hover:border-white hover:bg-amber-500 hover:scale-105 duration-300"
                >
                  Read Now
                </Link>
                <button
                  onClick={handleWishlist}
                  className="px-6 py-2.5 border-2 border-white hover:border-primary text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:scale-105 transition duration-300"
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
