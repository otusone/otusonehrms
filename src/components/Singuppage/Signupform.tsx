
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signupform.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  role:string;
}

function Signupform() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role:"USER"
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  console.log(formData);
    axios
      .post('https://hrms-ed5d.onrender.com/users', formData)
      .then((response) => {
        console.log('API response:', response.data);
      })
      .catch((error) => {
        console.error('Error making POST request to the API:', error.response);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          Welcome <span>to Signup!</span>
        </h2>
        <form className="formlogin" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <br />
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
          <div className="form-group">
            <label>Phone number</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <br/>
          <a href='/login'><p>Login</p></a>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signupform;
