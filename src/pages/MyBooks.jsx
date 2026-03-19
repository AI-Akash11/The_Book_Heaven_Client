import React from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/shared/Loading";
import ErrorPage from "../components/shared/ErrorPage";
import BookError from "../components/shared/BookError";
import BookTable from "../components/books/BookTable";
import Container from "../components/shared/Container";
import SectionTitle from "../components/shared/SectionTitle";
import SectionSubTitle from "../components/shared/SectionSubTitle";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const {
    data: myBooks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-books?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  if (myBooks.length === 0) {
    return <BookError></BookError>;
  }
  return (
    <Container>
      <section className="my-5 md:my-10">
        <div className="flex flex-col gap-1">
          <SectionTitle>
            My Books{" "}
            <span className="px-4 py-2 bg-primary text-white rounded-full shadow-md">
              {myBooks.length}
            </span>
          </SectionTitle>
          <SectionSubTitle>
            Manage and review the books you’ve added.
          </SectionSubTitle>
        </div>
        {myBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base-content/70 text-lg">
              No books added yet.
            </p>
          </div>
        ) : (
          <BookTable allBooks={myBooks} />
        )}
        <BookTable allBooks={myBooks} />
      </section>
    </Container>
  );
};

export default MyBooks;
