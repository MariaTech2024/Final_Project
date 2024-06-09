import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; 

function ProfilePage() {
  // State hooks for managing profile details
  const [name, setName] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/150"); // Default placeholder image URL

  useEffect(() => {
    // Retrieve saved details from localStorage when the component mounts
    const savedName = localStorage.getItem('profileName');
    const savedJoinDate = localStorage.getItem('joinDate');
    const savedAvatarUrl = localStorage.getItem('avatarUrl');

    // Update state with retrieved details if they exist
    if (savedName) setName(savedName);
    if (savedJoinDate) setJoinDate(savedJoinDate);
    if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
  }, []);

  // Handle image upload and convert it to a base64 string
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result); // Update avatarUrl state with the base64 string
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="avatar">
          {/* Display the current avatar image */}
          <img src={avatarUrl} alt="Avatar" />
          {/* Label and input for uploading a new avatar image */}
          <input 
            type="file" 
            id="upload-button" 
            accept="image/*" 
            onChange={handleImageChange} // Handle image file selection
          />
        </div>
        <div className="details">
          {/* Input field for updating the name */}
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} // Update name state on change
            />
          </label>
          {/* Display the join date */}
          <label>Date of joining: {joinDate}</label>
        </div>
      </div>
      <div className="profile-details">
        {/* Display the saved profile details */}
        <h2>Profile</h2>
        <p>Name: {name}</p>
        <p>Date of joining: {joinDate}</p>
      </div>
    </div>
  );
}

export default ProfilePage;