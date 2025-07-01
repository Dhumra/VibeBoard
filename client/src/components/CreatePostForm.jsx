import React, { useState } from 'react';
import axios from 'axios';

function CreatePostForm({onPostCreated}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:5007/api/posts', 
        {title, content, link },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
    );
    alert("✅ Post created!");
    console.log('Post added successful!');
    setTitle('');
    setContent('');
    setLink('');
    if(onPostCreated){
       onPostCreated();
    }
    } catch (err) {
    console.log(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePostForm;