import React from 'react';
import axios from 'axios';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

function PostFeed({ posts, onVoted, setToken, navigate }) {
  const token = localStorage.getItem("token");

  const handleVote = async (postId, voteType) => {
    try {
      await axios.post(
        `http://localhost:5009/api/posts/${postId}/vote`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onVoted();
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Vote failed: Unauthorized");
        localStorage.removeItem("token");
        setToken(null);
        navigate('/login');
      } else {
        console.error("Vote failed:", err.response?.data || err.message);
      }
    }
  };

  if (!posts) return <p>Loading posts...</p>;

  return (
    <div className="mt-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Community Feeds 🌐</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
          >
            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
            {post.link && (
              <p className="text-blue-500 hover:underline">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.link}
                </a>
              </p>
            )}
            {post.content && <p className="text-gray-600 mt-2">{post.content}</p>}

            {token && (
                <div className="mt-4">
  <div className="flex space-x-6 border border-black rounded-3xl px-4 py-2 w-fit bg-gray-50 shadow-sm">
    <div
      className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition"
      onClick={() => handleVote(post._id, "upvote")}
    >
      <BiSolidUpvote className="text-green-500 text-2xl" />
      <span className="text-gray-700 font-medium">{post.upvotes}</span>
    </div>
    <div
      className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition"
      onClick={() => handleVote(post._id, "downvote")}
    >
      <BiSolidDownvote className="text-red-500 text-2xl" />
      <span className="text-gray-700 font-medium">{post.downvotes}</span>
    </div>
  </div>
</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PostFeed;




              // <div className="mt-4 flex items-center space-x-6">
              //   <div
              //     className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition"
              //     onClick={() => handleVote(post._id, "upvote")}
              //   >
              //     <BiSolidUpvote className="text-green-500 text-2xl" />
              //     <span className="text-gray-700 font-medium">{post.upvotes}</span>
              //   </div>
              //   <div
              //     className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition"
              //     onClick={() => handleVote(post._id, "downvote")}
              //   >
              //     <BiSolidDownvote className="text-red-500 text-2xl" />
              //     <span className="text-gray-700 font-medium">{post.downvotes}</span>
              //   </div>
              // </div>