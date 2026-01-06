import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/shared/ErrorPage";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import UpdateBook from "../pages/UpdateBook";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-books',
                element: <AllBooks></AllBooks>
            },
            {
                path: '/add-book',
                element: <PrivateRoute><AddBook></AddBook></PrivateRoute>
            },
            {
                path: '/my-books',
                element: <PrivateRoute><MyBooks></MyBooks></PrivateRoute>
            },
            {
                path: '/book/:id',
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>
            },
            {
                path: '/update-book/:id',
                element: <PrivateRoute><UpdateBook></UpdateBook> </PrivateRoute>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    }
])