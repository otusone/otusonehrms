import React ,{useState} from 'react';
import"./SignUp.css";

const SignUp=() =>{
    const[formData,setFormData]=useState({UserName:"",email:"",password:"",designation:"",religion:"",gender:"",mobile:"",adress:"",dateOfBirth:"",role:"user"});
    const[errors,setErrors]=useState({});

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const validateForm=()=>{
        const newErrors={};

        if(!formData.userName.trim())newErrors.userName="UserName is required";
        if(!formData.email.trim())newErrors.email="Email is required";
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(validateForm()){
             console.log('Form submitted:', formData);
        }
    }
  return (
    
    <div className="signup-container">
      <div className="signup-header">
        <img src="/assets/logo.png" alt="OTUSONE Logo" className="logo" />
        <h1>Create Your Account</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="userName">Username*</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={errors.userName ? 'error' : ''}
            />
            {errors.userName && <span className="error-message">{errors.userName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password* (min 6 characters)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="designation">Designation*</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className={errors.designation ? 'error' : ''}
            />
            {errors.designation && <span className="error-message">{errors.designation}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender*</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number*</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'error' : ''}
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="religion">Religion</label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="role">Account Type</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Standard User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        
        <div className="form-group full-width terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the Terms and Conditions</label>
        </div>
        
        <button type="submit" className="submit-btn">Create Account</button>
      </form>
    </div>
  );
  
}

export default SignUp
