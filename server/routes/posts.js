const router = require("express").Router();
const auth = require("../middleware/Auth");
const Post = require("../models/Post");


router.get("/", async (req, res) => {      //get all posts
    try{
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

router.post("/", auth, async (req, res) => {      // create a new post
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




module.exports = router;