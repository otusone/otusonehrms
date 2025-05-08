import React from 'react';
import './user.css';

const UserModal = ({ open, handleClose, handleChange, handleCreate, inputData }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Create User</h2>
                <input name="username" placeholder="Username" value={inputData.username} onChange={handleChange} />
                <input name="email" placeholder="Email" value={inputData.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={inputData.password} onChange={handleChange} />
                <input name="role" placeholder="Role" value={inputData.role} onChange={handleChange} />
                <div className="modal-buttons">
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;