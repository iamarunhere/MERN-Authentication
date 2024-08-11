import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInFailure,
  signInSuccess,
  selectError,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

axios.defaults.withCredentials = true;

const Signin = () => {
  const [formdata, setFormData] = useState({});
  const { error } = useSelector(selectError) || {};
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formdata
      );
      dispatch(signInSuccess(res.data));
    } catch (error) {
      const errorMessage = error.response?.data || "something went wrong";
      dispatch(signInFailure({ message: errorMessage }));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "something went wrong" : ""}
      </p>
    </div>
  );
};

export default Signin;
