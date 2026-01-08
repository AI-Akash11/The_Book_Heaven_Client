import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/shared/Loading';
import ErrorPage from '../components/shared/ErrorPage';
import BookError from '../components/shared/BookError';
import BookTable from '../components/books/BookTable';

const MyBooks = () => {
    const {user} = useAuth()
    const axiosInstance = useAxios()

    const {data: myBooks = [], isLoading, isError } = useQuery({
        queryKey: ['myBooks', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/my-books?email=${user.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    if(isError){
        return <ErrorPage></ErrorPage>
    }

    if (myBooks.length === 0){
        return <BookError></BookError>
    }
    return (
        <div className="my-10 w-[90%] mx-auto">
      <h2 className="text-4xl font-bold text-base-content/90 mb-8 text-center">
        Manage and review the books you’ve added.
      </h2>

        <BookTable allBooks={myBooks} />
    </div>
    );
};

export default MyBooks;