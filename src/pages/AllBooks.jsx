import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/shared/Loading";
import BookTable from "../components/books/BookTable";

const AllBooks = () => {
  const axios = useAxios();
  const [allBooks, setAllbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => {
        setAllbooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axios]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-5 md:my-10 w-[90%] mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-2 text-center">
        All Books
      </h2>

      <h4 className=" text-gray-500 mb-10 text-center">
        Explore our complete collection and find your next adventure.
      </h4>

      {allBooks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No books available yet.</p>
        </div>
      ) : (
        <BookTable allBooks={allBooks} />
      )}
    </div>
  );
};

export default AllBooks;
