const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User'); 
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");

router.get("/",  (req, res) => res.send("Auth route placeholder"));

router.post("/register", async (req, res) => {
    try{
        console.log("Register route hit:", req.body);
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
         username,
         password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        console.error(err);

        // Duplicate username error (MongoError code 11000)
        if (err.code === 11000) {
          return res.status(409).json({ error: "Username already exists" });
        }

        res.status(500).json({ error: "Server error" });
    }
});

router.post('/login', async (req, res) => {
     try{
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not defined in environment variables");
        }

        // 3. Sign JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });

     }catch(err){
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
     }
});


module.exports = router;