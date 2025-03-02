import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthController from "../controllers/AuthController";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");

  const handleUpdateProfile = () => {
    const updatedUser = { ...user, username, email, bio, profilePic };
    AuthController.updateProfile(updatedUser);
    alert("Profile updated!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      AuthController.deleteAccount(user.id);
      logout();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full mt-2" placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mt-2" placeholder="Email" />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="border p-2 w-full mt-2" placeholder="Bio"></textarea>
      <input type="text" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} className="border p-2 w-full mt-2" placeholder="Profile Picture URL" />
      
      <button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-4 py-2 mt-2">Update Profile</button>
      <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 mt-2">Delete Account</button>
    </div>
  );
};

export default Profile;
