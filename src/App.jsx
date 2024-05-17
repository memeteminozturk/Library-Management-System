import "./App.css";
import Login from "./components/Login";
import LibraryList from "./components/LibraryList";
import GetLoans from "./components/GetLoans";
import Book from "./components/Book";
import {
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Admin from "./components/Admin";
import axios from "axios";
import { useEffect } from "react";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookDetail from "./components/BookDetail";
import Profile from "./components/profile/Profile";
import AdminPage from "./components/admin/AdminPage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/UserSlice";

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
      element: <AdminPage />,
    },
    {
      path: "user",
      element: <Profile />,
    },
    {
      path: "bookDetail/:isbn",
      element: <BookDetail />,
    },
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && !user.username) {
      getUser();
    } else if (
      !localStorage.getItem("token") &&
      !user.username &&
      location.pathname !== "/login"
    ) {
      navigate("/login");
    }
  }, [location]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/test", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setUser(res.data));
      localStorage.setItem("username", res.data.id);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

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
