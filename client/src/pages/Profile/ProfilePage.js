import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Assuming you have some basic CSS for styling

function ProfilePage() {
  const [name, setName] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/150"); // Default placeholder image URL

  useEffect(() => {
    // Retrieve saved details from localStorage
    const savedName = localStorage.getItem('profileName');
    const savedJoinDate = localStorage.getItem('joinDate');
    const savedAvatarUrl = localStorage.getItem('avatarUrl');

    if (savedName) setName(savedName);
    if (savedJoinDate) setJoinDate(savedJoinDate);
    if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the updated details to localStorage
    localStorage.setItem('profileName', name);
    localStorage.setItem('joinDate', joinDate);
    localStorage.setItem('avatarUrl', avatarUrl);
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <div className="avatar">
          <img src={avatarUrl} alt="Avatar" />
          <label htmlFor="upload-button" className="browse-button">Upload Image</label>
          <input type="file" id="upload-button" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="details">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Date of joining:
            <input type="date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
          </label>
          <button type="submit">Save</button>
        </div>
      </form>
      <div className="saved-details">
        <h2>Profile</h2>
        <p>Name: {name}</p>
        <p>Date of joining: {joinDate}</p>
      </div>
    </div>
  );
}

export default ProfilePage;