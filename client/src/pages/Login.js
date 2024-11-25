import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import InputForm from "../components/shared/InputForm";
import InputForm from "../components/shared/InputForm";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      }
      console.log(email, password);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("invalid credential");
      console.log(error.message);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            {/* Optional logo image */}
            <img
              src="/assets/images/logo/jp1.jpg"
              alt="logo"
              width="363" //flex bhi daal sakte hai
              height="250"
            />
            <InputForm
              htmlFor="Email"
              labelText={"Email"}
              type={"text"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              htmlFor="passsword"
              labelText={"password"}
              type={"text"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between">
              <p>
                Not a use? <Link to="/register"> register here</Link>
              </p>
              <button type="submit" className="btn btn-primary ">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
