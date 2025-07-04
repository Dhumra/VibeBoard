import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Admin({ setToken }) {

  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect( () => {
    const fetchPosts = async () => {
       try {
       const res = await axios.get(`http://localhost:5009/api/posts`,
        { headers: { Authorization: `Bearer ${token}` } }
       );
       setPosts(res.data);
    } catch (err) {
       console.error("Failed to fetch posts:", err);
    }
    };
    fetchPosts();

  }, [refresh]);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5009/api/posts/${postId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefresh(prev => !prev);
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Deletion failed: Unauthorized");
        localStorage.removeItem("token");
        setToken(null);
        navigate('/login');
      } else {
        console.error("Deletion failed:", err.response?.data || err.message);
      }
    }
  };


  if (!posts) return <p>Loading posts...</p>;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 via-orange-400 to-red-500 px-4 py-8">
  <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl space-y-6">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-orange-400 pb-3 text-center">
      Community Feeds 🌐
    </h2>

    {posts.length === 0 ? (
      <p className="text-center text-gray-500 italic text-lg">No posts yet.</p>
    ) : (
      posts.map(post => (
        <div
          key={post._id}
          className="bg-white border border-gray-300 rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{post.title}</h3>
          {post.link && (
            <p className="text-blue-600 hover:underline mb-4">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.link}
              </a>
            </p>
          )}
          {post.content && (
            <p className="text-gray-700 mb-5 leading-relaxed">{post.content}</p>
          )}

          <button
            onClick={() => deletePost(post._id)}
            className="!bg-red-600 !text-white px-5 py-2 rounded-lg hover:bg-red-700 active:bg-red-800 shadow-sm transition duration-150"
            aria-label={`Delete post titled ${post.title}`}
          >
            Delete
          </button>
        </div>
      ))
    )}
          <button
        onClick={() => navigate("/")}
        className="mt-4 !bg-orange-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
  </div>
</div>

  );
}

export default Admin;




//  <div className="mt-4 space-y-6">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Community Feeds 🌐</h2>
//       {posts.length === 0 ? (
//         <p className="text-gray-500">No posts yet.</p>
//       ) : (
//         posts.map(post => (
//           <div
//             key={post._id}
//             className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
//           >
//             <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
//             {post.link && (
//               <p className="text-blue-500 hover:underline">
//                 <a href={post.link} target="_blank" rel="noopener noreferrer">
//                   {post.link}
//                 </a>
//               </p>
//             )}
//             {post.content && <p className="text-gray-600 mt-2">{post.content}</p>}

//             <button
//                   onClick={() => deletePost(post._id)}
//                   className="!bg-red-500 !text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//           </div>
//         ))
//       )}
//     </div>