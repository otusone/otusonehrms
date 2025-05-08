// UserCard.jsx
import React from 'react';
import './userCard.css';

const UserCard = ({ label, image, name, email, handleClick }) => {
  return (
    <div className="user-card">
      <img src={image || '/asserst/images/profile_pic.jpg'} alt="profile" />
      <h3>{name}</h3>
      <p>{email}</p>
      <span className="label">{label}</span>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default UserCard;