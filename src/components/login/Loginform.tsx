// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Loginform.css";

// function Loginform() {
//   return (
//     <>
//       <div className="container formcontainer">
//         <h2>
//           Welcome <span>to login!</span>
//         </h2>
//         <form className="formlogin">
//           <div className="form-group">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               placeholder="Enter email"
//             />
           
//           </div>
//           <br />
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Password"
//             />
//           </div>
//           <br />

//           <a href="">
//             {" "}
//             <p>Forget Password?</p>
//           </a>
//           <br />

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>

//         <div className="differentbutton">
//           <button type="submit" >
//             Emplaoye Login
//           </button>
//           <button type="submit" >
//             Company Login
//           </button>
//           <button type="submit" >
//             HR Login
//           </button>
        
//         </div>
//       </div>
//     </>
//   );
// }

// export default Loginform;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginform.css";
import axios from "axios";

function Loginform() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post("https://hrms-ed5d.onrender.com/admin/login", formData)
      .then((response) => {
        console.log("API response:", response.data);
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
          <br/>
          <a><p>Forget Password ?</p></a>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="differentbutton">
          <button type="submit">Employee Login</button>
          <button type="submit">Company Login</button>
          <button type="submit">HR Login</button>
        </div>
      </div>
    </>
  );
}

export default Loginform;
