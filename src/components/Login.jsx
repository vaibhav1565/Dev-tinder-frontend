import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("Vaibhav");
  const [lastName, setLastName] = useState("Madan");
  const [email, setEmail] = useState("vaibhav@gmail.com");
  const [password, setPassword] = useState("Passwo3#");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setError("");
        dispatch(addUser(res.data.data));
        navigate("/");
        console.clear();
      }
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setError("");
        setMessage("User added successfully!!");
      }
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.error);
    }
  }

  return (
    <div className="card bg-base-100 w-96 mt-4 shadow-xl shadow-white">
      <form
        className="card-body"
        onSubmit={isLogin ? handleLogin : handleSignup}
      >
        <h2 className="text-center text-2xl">{isLogin ? "Login" : "Signup"}</h2>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-center">{message}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary my-0 mx-auto"
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </div>
        <p
          className="cursor-pointer text-center underline"
          onClick={() => {
            setIsLogin((value) => !value);
            setError("");
          }}
        >
          {isLogin
            ? "New to devTinder? Sign up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};
export default Login;
