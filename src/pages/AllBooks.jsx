import useAxios from "../hooks/useAxios";
import Loading from "../components/shared/Loading";
import BookTable from "../components/books/BookTable";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../components/shared/ErrorPage";
import Container from "../components/shared/Container";
import SectionTitle from "../components/shared/SectionTitle";
import SectionSubTitle from "../components/shared/SectionSubTitle";

const AllBooks = () => {
  const axiosInstance = useAxios();

  const {
    data: allBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-books");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <Container>
      <section className="my-5 md:my-10">
        <div className="flex flex-col gap-1"> 
          <SectionTitle>
            All Books{" "}
            <span className="px-4 py-2 bg-primary text-white rounded-full shadow-md">
              {allBooks.length}
            </span>
          </SectionTitle>
          <SectionSubTitle>
            Explore our complete collection and find your next adventure.
          </SectionSubTitle>
        </div>

        {allBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base-content/70 text-lg">
              No books available yet.
            </p>
          </div>
        ) : (
          <BookTable allBooks={allBooks} />
        )}
      </section>
    </Container>
  );
};

export default AllBooks;
