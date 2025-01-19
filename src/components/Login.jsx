import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants"
const Login = () => {
  const [emailID, setEmailID] = useState("vaibhavmadan@gmail.com");
  const [password, setPassword] = useState("Passwo3#");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/login",
        {emailID, password},
        {withCredentials: true}
      );
      if (res.status === 200) {
          setError("");
          dispatch(addUser(res.data));
          navigate("/feed");
      }
    }
    catch (e) {
      setError(e?.response?.data || "Something went wrong!");
    }
  }
  return (
    <form className="card bg-base-100 w-96 shadow-xl" onSubmit={e => handleLogin(e)}>
      <div className="card-body">
        <h2 className="card-title">Login Form</h2>
        <input className="input input-bordered"
          placeholder="Email"
          value={emailID}
          onChange={e => setEmailID(e.target.value)}
        />
        <input className="input input-bordered"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary my-0 mx-auto">Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login