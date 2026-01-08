import {
  FaBookOpen,
  FaDragon,
  FaUserSecret,
  FaHeart,
  FaLandmark,
  FaBrain,
  FaRocket,
  FaScroll,
} from "react-icons/fa";

const genres = [
  { name: "Fantasy", icon: FaDragon },
  { name: "Science Fiction", icon: FaRocket },
  { name: "Mystery", icon: FaUserSecret },
  { name: "Thriller", icon: FaScroll },
  { name: "Romance", icon: FaHeart },
  { name: "Historical Fiction", icon: FaLandmark },
  { name: "Non-Fiction", icon: FaBookOpen },
  { name: "Self-Help", icon: FaBrain },
];

const TopGenres = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-base-content mb-3">
          Top Genres
        </h2>
        <p className="text-center text-base-content/70 mb-12 max-w-xl mx-auto">
          Explore the most loved book genres curated for every kind of reader
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => {
            const Icon = genre.icon;
            return (
              <div
                key={genre.name}
                className="
                  group bg-base-200 rounded-2xl p-6
                  flex flex-col items-center justify-center text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    mb-4 p-4 rounded-full
                    bg-accent/10 text-accent
                    group-hover:bg-accent group-hover:text-base-100
                    transition-all duration-300
                  "
                >
                  <Icon className="text-3xl" />
                </div>

                <h3 className="text-lg font-semibold text-base-content">
                  {genre.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopGenres;
