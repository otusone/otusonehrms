import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginform() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("https://hrms-ed5d.onrender.com/admin/login", formData)
      .then((response) => {
        console.log("API response:", response);
        let result = response;
        if (result.status === 200) {
          localStorage.setItem("userToken", response.data.token);
          if (response.data.token && response.data.admin.role == "USER") {
            // console.log("got");
            navigation("/");
          } else {
            // console.log("no");
            navigation("/");
          }
        }
      })
      .catch((error) => {
        console.error("Error making POST request to the API:", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container formcontainer">
        <h2>
          Welcome <span>to login!</span>
        </h2>
        <form className="formlogin" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <br />
          <a>
            <p>Forget Password ?</p>
          </a>
          <a href="/Signup">
            <p>Sign Up</p>
          </a>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Loginform;
