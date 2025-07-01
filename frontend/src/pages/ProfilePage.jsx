import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white px-6 py-10"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/29579758/pexels-photo-29579758.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Responsive Layout */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl bg-transparent rounded-xl overflow-hidden items-center md:items-start gap-10">
        {/* Avatar Section */}
        <div className="flex justify-center w-full md:w-1/2">
          <div
            onClick={() => {
              setIsActive(true);
              setTimeout(() => setIsActive(false), 1200);
            }}
            className={`relative group transition-all duration-500 
              ${isActive ? "scale-110" : ""}
            `}
          >
            {/* Yellow Ring (rim) */}
            <div
              className={`absolute inset-0 rounded-full 
                border-[6px] md:border-[8px] border-yellow-400 
                transition-all duration-500 scale-100 
                group-hover:scale-125 z-0 mt-20
              `}
            />

            {/* Profile Image */}
            
                <img
                  src={selectedImg || authUser?.profilepic || "/avatar.png"}
                  alt="Profile"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 object-cover rounded-full border-4 border-gradient-to-br from-yellow-400 to-purple-800 relative z-10 mt-20"
                />
              
            
            

            {/* Camera Upload Button */}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:scale-105 transition z-20 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-black" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Hey {authUser?.fullname || "User"}!
          </h1>
          <p className="text-sm">Your profile info</p>

          <div className="space-y-4 text-sm">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-white/70 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <p className="bg-white/20 px-4 py-2 rounded-md">
                {authUser?.fullname}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-white/70 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="bg-white/20 px-4 py-2 rounded-md">
                {authUser?.email}
              </p>
            </div>

            {/* Account Info */}
            <div className="pt-4">
              <h2 className="text-lg font-semibold mb-2">Account Info</h2>
              <div className="space-y-2 text-white/70 text-sm">
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <span>
                    {authUser?.createdAt
                      ? authUser.createdAt.split("T")[0]
                      : "Not Available"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
