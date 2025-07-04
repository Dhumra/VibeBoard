#  VIBEBOARD


---

## 📌 Overview

**VibeBoard** is a modern, scalable community platform that enables users to register, share posts, vote, and engage within a Reddit-style interface. Built with React, Node.js, Express, and MongoDB, it offers a robust architecture designed for growth and customization.

---

## 🚀 Why VibeBoard?

This project empowers developers to create engaging social platforms with ease. The core features include:

- 🟢 **Lightning-fast Development**: React setup optimized with Vite and Tailwind CSS for rapid iteration and a polished UI.  
- 🟣 **Secure User Management**: Role-based authentication and session handling to protect user data and content.  
- 🔵 **Interactive Content**: Dynamic post feeds with voting mechanics to foster community engagement.  
- 🟠 **Modular Backend**: RESTful APIs for content moderation, voting, and user operations, ensuring scalability.  
- 🟡 **Extensible Architecture**: Clear separation of frontend and backend, facilitating future enhancements and integrations.

---

## 🛠️ Built With

| Tool        | Purpose                      |
|-------------|------------------------------|
| React       | Frontend library             |
| Vite        | Fast React build tooling     |
| Tailwind CSS| Styling                      |
| Axios       | HTTP client                  |
| Express     | Backend framework            |
| Node.js     | Server-side JavaScript       |
| MongoDB     | Database                     |
| Mongoose    | MongoDB ODM                  |
| JSON        | Data exchange format         |
| dotenv      | Environment configuration    |
| JWT         | Authentication tokens        |
| Nodemon     | Live-reloading backend dev   |
| ESLint      | Code quality tool            |

---

## 🔧 Project Structure

```
vibeboard/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Forms, feeds, etc.
│   │   ├── pages/        # Login, Register, Admin, Home
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
│
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Auth and Post APIs
│   ├── middleware/       # JWT auth middleware
│   ├── .env              # Env vars (JWT_SECRET, MONGO_URI)
│   └── index.js          # App entry point
```

---

## 🌍 Deployment :

- **Frontend**: [Vercel](https://vibe-board.vercel.app/)
- **Backend**: [Render](https://vibeboard-4w42.onrender.com)


---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vibeboard.git
cd vibeboard
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then run the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Your frontend will run at `http://localhost:5173`

---

## ✅ Features Implemented

### Core Requirements:

- ✅ Register and login
- ✅ Post a message or a link
- ✅ Upvote and downvote posts
- ✅ Feed sorted by most upvoted

### Bonus Features:

- ✅ Mobile-responsive design (Tailwind CSS)
- ✅ Built with React and Vite
- ✅ Admin dashboard to delete posts

---

## 🧠 Design Choices

- **Vite**: For its fast hot module reloading and lightweight dev server.
- **Tailwind CSS**: To ensure consistent and elegant styling with minimal CSS.
- **JWT Auth**: Simple and stateless authentication between frontend and backend.
- **Role-based Access Control**: `isAdmin` property determines access to the admin dashboard.
- **MongoDB**: Flexible schema and ideal for fast development.
- **React Tabs**: To organize "Create Post" and "Community Feed" views.
- **Axios**: For cleaner HTTP request management.

---

## 🔐 User Roles

Each user has a JWT token stored in `localStorage`. On login or reload, the app sends the token to the backend to retrieve user info (including `isAdmin` status), which is used to conditionally render the **Admin Panel** button.

---
## 👑 Admin Access

VibeBoard includes a basic admin panel that allows authorized users to delete inappropriate posts from the community feed.

To explore admin functionality, you can log in with the following pre-configured admin account:

```bash
Username: Dhum  
Password: 1234
```
⚠️ Security Note: For demonstration purposes, the credentials are public. In a production system, admin access should be securely managed and protected with proper user roles and permission controls.

🔐 How Admin Access Works
	•	Upon login, the backend generates a JWT token that includes the isAdmin flag.
	•	The frontend checks this flag to display the Admin Panel button.
	•	Only users with admin rights can see and access the panel or perform delete operations on posts.

---

## 🔄 Post Feed Logic

- Posts are fetched via `/api/posts`, sorted by `upvotes - downvotes`.
- Users can:
  - Upvote (green icon)
  - Downvote (red icon)
- Admin users can:
  - Delete any post
- Vote counts update instantly without full reload.

---

## 📱 Responsive Design

- Uses Tailwind's mobile-first classes (`max-w`, `w-full`, `text-center`, `space-y-4`)
- Navbar and buttons adapt to smaller screens
- Components remain accessible at all screen sizes
- Header and buttons collapse properly at `<500px` widths

---

## 🔁 Refresh Logic

- After login, `App.jsx` loads the token and user data
- After post creation, voting, or deletion, the component refreshes the post feed automatically
- `useEffect` handles token verification on reloads

---

## 🧹 Future Improvements

- Comment system on posts
- Notifications or live updates via WebSockets
- Edit posts
- Pagination/infinite scrolling
- Dark mode toggle
- User profiles and post history

---

## 👏 Credits

Built by Dhumravarna Ambre
Inspired by Reddit’s core functionality  
Open to contributions and feedback!

---

## 📜 License

MIT — Feel free to use and modify with attribution.

---
