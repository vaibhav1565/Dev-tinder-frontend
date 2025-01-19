import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

import {removeUser} from "../utils/userSlice"
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout () {
    try {
      const res = await axios.post(BASE_URL + "/logout", 
        {},
        {withCredentials: true}
      );
      if (res.status === 200) {
        dispatch(removeUser());
        dispatch(removeFeed());
        navigate("/login");
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="navbar bg-accent h-min">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-primary-content">devTinder</Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <span className="text-primary-content">
              Welcome, {user.firstName}
            </span>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/feed" className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/connections">
                Connections
                </Link>
              </li>
              <li>
                <Link to="/requests">
                Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar