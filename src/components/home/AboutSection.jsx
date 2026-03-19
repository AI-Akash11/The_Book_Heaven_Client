import React from "react";
import { Link } from "react-router";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import SectionSubTitle from "../shared/SectionSubTitle";

const AboutSection = () => {
  return (
    <Container>
      <section className="py-10 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>About The Book Haven</SectionTitle>

          <SectionSubTitle>
            Your cozy corner of the internet where stories come alive.
          </SectionSubTitle>

          <div className="prose prose-lg mx-auto text-base-content/70 space-y-5">
            <p>
              Welcome to{" "}
              <span className="font-semibold text-primary">The Book Haven</span>{" "}
              — a community-driven platform for book lovers to discover, share,
              and celebrate the joy of reading.
            </p>
            <p>
              Whether you're hunting for your next page-turner, exploring hidden
              gems across genres, or connecting with fellow readers, we've built
              this space to feel like your personal library — warm, inviting,
              and full of wonder.
            </p>
            <p>
              From timeless classics to the latest releases, every book has a
              home here. Rate, review, and revisit your favorites. Let's build a
              haven where every story matters.
            </p>
          </div>

          <div className="mt-10">
            <Link
              to={"/all-books"}
              className="px-8 py-3 bg-primary text-error font-medium text-lg rounded-lg hover:bg-primary/90 transition shadow-md"
            >
              Explore All Books
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutSection;
