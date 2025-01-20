import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("Munni");
  const [lastName, setLastName] = useState("Garg");
  const [emailID, setEmailID] = useState("vaibhav@gmail.com");
  const [password, setPassword] = useState("Passwo3#");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setError("");
        dispatch(addUser(res.data));
        navigate("/feed");
      }
    } catch (e) {
      setError(e?.response?.data || "Something went wrong!");
    }
  }

  async function handleSignup() {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {firstName, lastName, emailID, password},
        {withCredentials: true}
      );

      if (res.status === 200) {
        setError("");
        dispatch(addUser(res.data));
        navigate("/profile")
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  
  return (
    <div
      className="card bg-base-100 w-96 shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title">{isLogin ? "Login" : "Signup"} Form</h2>
        {!isLogin && (
          <>
            <input
              className="input input-bordered"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="input input-bordered"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <input
          className="input input-bordered"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary my-0 mx-auto"
          onClick={()=>{
            isLogin ? handleLogin() : handleSignup()
          }}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </div>
        <p className="cursor-pointer text-center" onClick={() => setIsLogin((v) => !v)}>
          {isLogin
            ? "New to devTinder? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};
export default Login;