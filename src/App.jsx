import "./App.css";
import Login from "./components/Login";
import LibraryList from "./components/LibraryList";
import GetLoans from "./components/GetLoans";
import Book from "./components/Book";
import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Admin from "./components/Admin";
import axios from "axios";
import { useEffect } from "react";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookDetail from "./components/BookDetail";

function App() {
  const routes = [
    {
      path: "/",
      element: <LibraryList />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/getLoans",
      element: <GetLoans />,
    },
    {
      path: "/bookList/:id",
      element: <Book />,
    },
    {
      path: "/bookList",
      element: <Book />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "user",
      element: <User />,
    },
    {
      path: "bookDetail/:isbn",
      element: <BookDetail />,
    }
  ];
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />

    </>
  );
}

export default App;
