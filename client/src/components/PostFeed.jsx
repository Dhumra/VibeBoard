import React from 'react';

function PostFeed({ posts }) {
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
                🔗 <a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a>
              </p>
            )}
            {post.content && <p>{post.content}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default PostFeed;
