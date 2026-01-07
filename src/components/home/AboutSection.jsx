import React from 'react';
import { Link } from 'react-router';

const AboutSection = () => {
  return (
    <section className="py-20 mb-10 bg-gradient-to-b from-info to-warning text-base-content rounded-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
            About The Book Haven
          </h2>

          <p className="text-lg md:text-xl text-base-content/70 mb-8 leading-relaxed">
            Your cozy corner of the internet where stories come alive.
          </p>

          <div className="prose prose-lg mx-auto text-base-content/70 space-y-5">
            <p>
              Welcome to <span className="font-semibold text-primary">The Book Haven</span> — a
              community-driven platform for book lovers to discover, share, and celebrate the joy of
              reading.
            </p>
            <p>
              Whether you're hunting for your next page-turner, exploring hidden gems across genres,
              or connecting with fellow readers, we've built this space to feel like your personal
              library — warm, inviting, and full of wonder.
            </p>
            <p>
              From timeless classics to the latest releases, every book has a home here. Rate, review,
              and revisit your favorites. Let's build a haven where every story matters.
            </p>
          </div>

          <div className="mt-10">
            <Link to={'/all-books'} className="px-8 py-3 bg-primary text-error font-medium text-lg rounded-lg hover:bg-primary/90 transition shadow-md">
              Explore All Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;