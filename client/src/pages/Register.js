import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
// import InputForm from "../components/shared/inputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //redux state
  const { loading } = useSelector((state) => state.alerts);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return alert("Please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Registered Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid from details Please try again ");
      console.log(error.message);
    }
  };
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValues({
  //     ...value,
  //     [e.target.name]: value,
  //   });
  // };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            {/* <img src="/assets/images/logo/logo3.png" alt="logo" /> */}
            <img
              src="/assets/images/logo/jp2.jpg"
              alt="logo"
              width="500"
              height="250"
            />

            <InputForm
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />
            <InputForm
              htmlFor="lastName"
              labelText={"lastName"}
              type={"text"}
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
            <InputForm
              htmlFor="email"
              labelText={"email"}
              type={"text"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              htmlFor="password"
              labelText={"password"}
              type={"text"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between">
              <p>
                Already Registerd
                <Link to="/login"> Login</Link>
              </p>
              <button type="submit" className="btn btn-primary ">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
