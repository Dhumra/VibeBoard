import React, { useEffect, useState } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';
import axios from 'axios';


function Home() {

   const token = localStorage.getItem('token');
   const [posts, setPosts] = useState([]);
   const [refresh, setRefresh] = useState(false);

   useEffect(() => {
        
        // Use api to fetch all posts from backend 
        const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5007/api/posts');
            console.log("Fetched posts:", res.data);
            setPosts(res.data);
        }catch(err){
           console.error("Error fetching posts:", err.response?.data || err.message);
        }
        };
        fetchPosts();
    }, [refresh]);  //re-fetch every time refresh changes

    if(!token){
      return (
        <div>
         <h2>Welcome to VibeBoard 🔐</h2>
         <p>Please <a href="/login">log in</a> or <a href="/register">register</a> to access the community.</p>
        </div>
      )
    }

  return (
    <div>
      <h1>Welcome to VibeBoard 🔥</h1>
      <CreatePostForm  onPostCreated = {() => setRefresh(prev => !prev)} />
      <PostFeed posts={posts}/>
    </div>
  );
}

export default Home;