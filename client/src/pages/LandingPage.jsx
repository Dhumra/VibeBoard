import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  console.log("API base URL:", import.meta.env.VITE_API_URL);
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-500 via-orange-400 to-red-500 px-6 py-12">
      <div className="w-full h-full bg-white shadow-2xl rounded-none p-10 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">Welcome to VibeBoard 🔐</h1>
        <p className="text-lg text-gray-700 mb-8">Join the vibe. Share ideas. Vote together.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center">
          <Link
            to="/login"
            className="bg-red-500 !text-white text-lg px-8 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-orange-400 !text-black text-lg px-8 py-3 rounded-lg hover:bg-orange-500 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;


