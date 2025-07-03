const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User'); 
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");

router.get("/",  (req, res) => res.send("Auth route placeholder"));

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is not defined in environment variables");
    }

    // Create token on registration
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token }); // send token back
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
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