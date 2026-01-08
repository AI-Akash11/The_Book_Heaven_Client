import useAxios from "../../hooks/useAxios";
import BookCard from "../books/BookCard";
import Loading from "../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import BookError from "../shared/BookError";

const LatestBooks = () => {
  const axiosInstance = useAxios();

  const {data: latestBooks = [], isLoading, isError} = useQuery({
    queryKey: ['latestBooks'],
    queryFn: async()=>{
        const res = await axiosInstance.get('/latest-books')
        return res.data
    }
  })


  if(isLoading){
    return <Loading></Loading>
  }

  if (isError){
    return <BookError></BookError>
  }
  
  return (
    <div className="my-10 lg:my-20 w-[90%] mx-auto">
      <h2 className="text-5xl font-bold text-base-content mb-2 text-center">
        Latest Books
      </h2>

      <h4 className=" text-base-content/70 mb-6 text-center">Explore what’s new on our shelves right now.</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestBooks.map((bookData) => (
          <BookCard key={bookData._id} bookData={bookData} />
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
