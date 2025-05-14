import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UserProfile.css";

const UserProfile = () => {
    // Sample user data - in a real app, this would come from an API or context
    const sampleUser = {
        userName: "john_doe",
        email: "john@example.com",
        password: "password123",
        designation: "Software Engineer",
        religion: "Christian",
        gender: "Male",
        mobile: "1234567890",
        address: "123 Main St, New York, NY",
        dateOfBirth: "1990-01-01",
        role: "user"
    };

    const [formData, setFormData] = useState(sampleUser);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(sampleUser);

    useEffect(() => {
        // In a real app, you would fetch user data here
        setOriginalData(sampleUser);
        setFormData(sampleUser);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.userName.trim()) {
            newErrors.userName = "Username is required";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }
        if (!formData.designation.trim()) {
            newErrors.designation = "Designation is required";
            isValid = false;
        }
        if (!formData.gender) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be 10 digits";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real app, you would make an API call here
            setOriginalData(formData);
            setIsEditing(false);
            toast.success('Profile updated successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log('Profile updated:', formData);
        } else {
            toast.error('Please fix the errors in the form', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(originalData);
        setErrors({});
        setIsEditing(false);
        toast.info('Changes discarded', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="profile-container">
            <ToastContainer />
            <div className="profile-header">
                <img src="/assets/logo.png" alt="OTUSONE Logo" className="logo" />
                <h1>User Profile</h1>
                <div className="profile-status">
                    <span className={`status-badge ${formData.role === 'admin' ? 'admin' : 'user'}`}>
                        {formData.role === 'admin' ? 'Administrator' : 'Standard User'}
                    </span>
                </div>
            </div>

            <div className="profile-content">
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-section">
                        <h2>Basic Information</h2>
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password*</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? 'error' : ''}
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
                                />
                                {errors.designation && <span className="error-message">{errors.designation}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateOfJoining">dateOfJoining*</label>
                                <input
                                    type="text"
                                    id="dateOfJoining"
                                    name="dateOfJoining"
                                    value={formData.dateOfJoining}
                                    onChange={handleChange}
                                    className={errors.dateOfJoining ? 'error' : ''}
                                    disabled={!isEditing}
                                />
                                {errors.dateOfJoining && <span className="error-message">{errors.dateOfJoining}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Personal Details</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="gender">Gender*</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={errors.gender ? 'error' : ''}
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="update-btn">
                                Update Profile
                            </button>
                        </div>
                    ) : (
                        <div className="form-actions">
                            <button type="button" className="edit-btn" onClick={handleEdit}>
                                Edit Profile
                            </button>
                        </div>
                    )}
                </form>

                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            <span>{formData.userName.charAt(0).toUpperCase()}</span>
                        </div>
                        {isEditing && (
                            <button className="avatar-upload-btn">
                                Change Photo
                            </button>
                        )}
                    </div>

                    <div className="profile-stats">
                        <h3>Account Information</h3>
                        <div className="stat-item">
                            <span className="stat-label">Member Since</span>
                            <span className="stat-value">Jan 2023</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Last Updated</span>
                            <span className="stat-value">Today</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Account Status</span>
                            <span className="stat-value active">Active</span>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="action-btn change-password">
                            Change Password
                        </button>
                        <button className="action-btn deactivate">
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;