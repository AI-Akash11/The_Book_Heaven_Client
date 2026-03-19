import useAxios from "../../hooks/useAxios";
import BookCard from "../books/BookCard";
import Loading from "../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import BookError from "../shared/BookError";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import SectionSubTitle from "../shared/SectionSubTitle";

const LatestBooks = () => {
  const axiosInstance = useAxios();

  const {
    data: latestBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/latest-books");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <BookError></BookError>;
  }

  return (
    <Container>
      <section className="my-10 lg:my-20">
        <SectionTitle>

          Latest Books
        </SectionTitle>

        <SectionSubTitle>
          Explore what's new on our shelves right now.
        </SectionSubTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBooks.map((bookData) => (
            <BookCard key={bookData._id} bookData={bookData} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default LatestBooks;
