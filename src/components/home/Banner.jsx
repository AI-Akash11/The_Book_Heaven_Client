import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LogoImg from "../../utils/LogoImg";

const images = [
  "https://i.ibb.co.com/27fXYgrK/Zombie-FANG-YUAN.jpg",
  "https://i.ibb.co.com/nqq5xnrR/download.jpg",
  "https://i.ibb.co.com/M5RZDQvm/lotm.jpg",
  "https://i.ibb.co.com/8n5JQmdQ/Reverend-insanity.jpg",
  "https://i.ibb.co.com/LXMr2z1v/Fang-Yuan-wants-to-recover-his-extreme-eagle.jpg",
  "https://i.ibb.co.com/j0MX5cZ/witcher.jpg",
  "https://i.ibb.co.com/1Y0r19w5/got.jpg",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(id);
  }, [isPaused]);

  const goToPrevious = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div
      className="relative h-[50vh] sm:h-[60vh] lg:h-125 xl:h-150 w-full overflow-hidden flex items-center justify-center mt-2 sm:mt-4 lg:mt-5 rounded-xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <img
              src={images[index]}
              alt={`Book cover ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-1 
                   bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   text-white p-2 sm:p-3 rounded-full
                   transition-all duration-300 hover:scale-110
                   border border-white/20"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-xl sm:text-2xl" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-1 
                   bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   text-white p-2 sm:p-3 rounded-full
                   transition-all duration-300 hover:scale-110
                   border border-white/20"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-xl sm:text-2xl" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-1 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl 
                     font-bold text-amber-400 drop-shadow-2xl 
                     mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight flex items-center justify-center gap-3"
        >
          <img className='w-18 md:w-24' src="https://i.ibb.co.com/dJmHymSK/icons8-book-48.png" alt="" /> The Book Haven
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm md:text-lg
                     text-gray-100 max-w-3/4 md:max-w-2xl mx-auto leading-relaxed 
                     mb-8 sm:mb-10 md:mb-12 drop-shadow-lg"
        >
          Discover enchanted realms, timeless heroes, and stories beyond imagination
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 
                     justify-center items-center"
        >
          <Link to="/all-books" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-accent/90 text-base-content font-semibold 
                         px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-xl 
                         transition-all duration-300 
                         text-sm md:text-base lg:text-lg w-1/2 md:w-full sm:w-auto
                         hover:shadow-2xl hover:shadow-amber-500/50
                         border-2 border-accent hover:border-white"
            >
              Explore Books
            </motion.button>
          </Link>

          <Link to="/add-book" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-info hover:info/90 text-base-content font-semibold 
                         px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-xl 
                         transition-all duration-300 
                         text-sm md:text-base lg:text-lg w-1/2 md:w-full sm:w-auto
                         backdrop-blur-sm
                         border-2 border-secondary hover:border-white"
            >
              Add Book
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 
                      flex gap-2 z-1">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
              i === index
                ? "bg-primary w-8 sm:w-10 md:w-12 h-2 sm:h-2.5"
                : "bg-white/40 w-2 sm:w-2.5 h-2 sm:h-2.5 hover:bg-primary"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {!isPaused && (
        <motion.div
          className="absolute top-0 left-0 h-1 bg-accent z-1"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={index}
        />
      )}
    </div>
  );
};

export default Banner;