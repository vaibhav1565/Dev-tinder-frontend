import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

import {removeUser} from "../utils/userSlice"
import { removeAllFeed } from "../utils/feedSlice";
import { removeAllRequests } from "../utils/requestsSlice";
import { removeAllConnections } from "../utils/connectionsSlice";

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
        dispatch(removeAllConnections());
        dispatch(removeAllFeed());
        dispatch(removeAllRequests());
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
        <Link to="/" className="text-black text-2xl">
          Dev Tinder
        </Link>
      </div>
      {user?.data && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <span className="text-primary-content">
              Welcome, {user.data.firstName}
            </span>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="" src={user.data?.photoUrl} />
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
                <Link to="/" className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/password">Update password</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar