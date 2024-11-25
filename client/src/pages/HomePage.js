import React from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card" w-25 h-25>
          <img src="/assets/images/logo/logo.png" alt="logo" />
          <hr />
          <div className="card-body" style={{ marginTop: "-60px" }}>
            <h5>India's career platform. </h5>
            <p className="card-text">
              Search and manage your jobs with ease. Open source job portal
              webapplication by ProgrammingBeast
            </p>
            <div className="d-flex justify-content-between mt-5 ">
              <p>
                Not a user <Link to="/register">Here</Link>
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
