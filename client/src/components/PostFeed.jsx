import React from 'react';
import axios from 'axios';

function PostFeed({ posts, onVoted, setToken, navigate }) {

  const token = localStorage.getItem("token");

  const handleVote = async (postId, voteType) => {
    try {
      await axios.post(`http://localhost:5007/api/posts/${postId}/vote`,
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
    <div>
      <h2>Community Feeds</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{post.title}</h3>
            {post.link && (
              <p>
                 <a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a>
              </p>
            )}
            {post.content && <p>{post.content}</p>}
            {token && (
            <>
              <p>Upvotes: {post.upvotes} | Downvotes: {post.downvotes}</p>
              <button onClick={() => handleVote(post._id, 'upvote')}>⬆️</button>
              <button onClick={() => handleVote(post._id, 'downvote')}>⬇️</button>
            </>
            )}

          </div>
        ))
      )}
    </div>
  );
}

export default PostFeed;
