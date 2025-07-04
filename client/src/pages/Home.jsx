import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import API from '../api/axios';
import CreatePostForm from "../components/CreatePostForm";
import PostFeed from "../components/PostFeed";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home({ user, token, setToken }) {
  console.log("User info:", user);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched posts:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login");
        }
      }
    };
    fetchPosts();
  }, [refresh, token, navigate, setToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  //Should i remove this  ?? ========== =======================
  if (!token) {
    
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to VibeBoard 🔐</h2>
        <p className="text-gray-600 mt-2">
          Please <a href="/login" className="text-blue-500 underline">log in</a> or{" "}
          <a href="/register" className="text-blue-500 underline">register</a> to access the community.
        </p>
      </div>
    );
  }
  // ======================== =========================

  return (
  <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 via-orange-400 to-red-500 px-4 py-8">
    <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl space-y-6">

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
    Welcome to VibeBoard 🔥
  </h1>

  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
    <button
      onClick={handleLogout}
      className="!bg-red-500 !text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
    >
      Logout
    </button>

    {user?.isAdmin && (
      <button
  onClick={() => navigate("/admin")}
  className="!bg-black !text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition w-full sm:w-auto whitespace-nowrap"
>
  Admin Panel
</button>
    )}
  </div>
</div>

      {/* Feed */}
      <div>
        <PostFeed
          posts={posts}
          onVoted={() => setRefresh((prev) => !prev)}
          setToken={setToken}
          navigate={navigate}
        />
      </div>

      {/* Create Post Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="!bg-orange-500 !text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          {showForm ? "Close Post Form ❌" : "Create a New Post ✍️"}
        </button>
      </div>

      {/* Create Post Form */}
      {showForm && (
        <CreatePostForm
          onPostCreated={() => {
            setRefresh((prev) => !prev);
            setShowForm(false);
          }}
          setToken={setToken}
          navigate={navigate}
        />
      )}
    </div>
  </div>
);
}




