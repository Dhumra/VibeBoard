const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User'); 
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");

router.get("/",  (req, res) => res.send("Auth route placeholder"));

router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: decoded.id, username: decoded.username, isAdmin: decoded.isAdmin });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

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
        throw new Error(" JWT_SECRET is not defined in environment variables");
    }

    // Create token on registration
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token }); // send token back
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post('/login', async (req, res) => {
     try{
        console.log("Login request:", req.body);
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("Found user in DB:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error(" JWT_SECRET is not defined in environment variables");
        }

        // 3. Sign JWT token
        const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });

     }catch(err){
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
     }
});


module.exports = router;