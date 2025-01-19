import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  async function fetchUser() {
      if (user) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view",
          {withCredentials: true}
        );
        dispatch(addUser(res.data));
      }
      catch (e) {
        if (e.status === 401) {
          navigate("/login");
        }
        // console.error(e);
      }
  }

  useEffect(()=>{
    fetchUser();
  },[])
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
