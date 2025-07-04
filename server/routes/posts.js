const router = require("express").Router();
const auth = require("../middleware/Auth");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Get all posts from Db
router.get("/", async (req, res) => {      
    try{
      const posts = await Post.find().sort({ upvotes: -1, createdAt: -1 });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});


// Delete particular post (only by admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    //Admin Check
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const postId = req.params.id;

    //Find and Delete the Post
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new post
router.post("/", auth, async (req, res) => {      
    try {
        const { title, content, link } = req.body;
        const newPost = new Post({ title, content, link, user: req.user.id });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Upvote/Downvote a Post
router.post("/:id/vote", auth, async (req, res) => {
    // userId is acquired from jwt token
    // id belongs to id of the post on which i am operating on
    const postId = req.params.id;
    const userId = req.user.id;
    const voteType = req.body.voteType;

    

    try{
       const post = await Post.findById(postId);
       if (!post) return res.status(404).json({ error: "Post not found" });
       
       const userVote = post.votedUsers.find(user => user.userId === String(userId));

       if(userVote){
        //User has cast a vote on this post
        
        if(voteType === userVote.vote){    // if same botton is clicked twice
            if(voteType == 'upvote'){
              post.upvotes--;
            }else{
              post.downvotes--;
            }
            post.votedUsers = post.votedUsers.filter(user => user.userId !== String(userId));
            //delete the object in votedUser
        }else{
           if(userVote.vote == 'upvote'){
              post.upvotes--;
              post.downvotes++;
            }else{
              post.downvotes--;
              post.upvotes++;
            }
            userVote.vote = voteType;
        }
    }else{
        // User hasnt cast a vote before
        if(voteType === 'upvote'){
            post.upvotes++;
        }else{
            post.downvotes++;
        }
        post.votedUsers.push({ userId, vote: voteType });
    }

    await post.save();
    res.status(200).json(post);
    }catch(err){
     console.error(err);
     res.status(500).json({ error: "Server error" });
    }
  
});







module.exports = router;