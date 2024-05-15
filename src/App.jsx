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

function App() {
  const routes = createBrowserRouter([
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
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "user",
      element: <User />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
