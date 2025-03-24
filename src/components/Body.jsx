import NavBar from "./NavBar";
import Footer from "./Footer";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

import axios from "axios";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchUser() {
      if (user.data) {
        if (location.pathname === "/login") navigate("/");
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
          signal, // Pass the signal to axios
        });
        dispatch(addUser(res.data.data));
      } catch (e) {
        if (e.code !== "ERR_CANCELED" && e.code !== "ECONNABORTED") {
          console.log(e);
        }
        if (location.pathname !== "/login") navigate("/login");
      }
    }

    fetchUser();

    return () => {
      controller.abort(); // Cancel request if component unmounts or re-renders
    };
    //todo: add location.pathname using useSyncExternalStore
  }, [dispatch, navigate, user]);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;