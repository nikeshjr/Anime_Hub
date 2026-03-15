<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&duration=3000&pause=1000&color=A78BFA&center=true&vCenter=true&width=500&lines=Full-Stack+MERN+Application;Discover+%C2%B7+Search+%C2%B7+Collect+%C2%B7+Engage" alt="Typing SVG" />

# AnimeHub

<p>A full-stack MERN application for anime enthusiasts to<br/>discover, search, and manage a personalized collection of series.</p>

<br/>

[![React](https://img.shields.io/badge/-React-0d1117?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/-Node.js-0d1117?style=for-the-badge&logo=nodedotjs&logoColor=3C873A)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/-Express-0d1117?style=for-the-badge&logo=express&logoColor=ffffff)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-0d1117?style=for-the-badge&logo=mongodb&logoColor=47A248)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/-JWT-0d1117?style=for-the-badge&logo=jsonwebtokens&logoColor=ffffff)](https://jwt.io/)
[![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-0d1117?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/-Vite-0d1117?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vitejs.dev/)

<br/>

![Stars](https://img.shields.io/github/stars/your-username/animehub?style=flat-square&color=A78BFA&labelColor=0d1117)
![Forks](https://img.shields.io/github/forks/your-username/animehub?style=flat-square&color=A78BFA&labelColor=0d1117)
![Issues](https://img.shields.io/github/issues/your-username/animehub?style=flat-square&color=A78BFA&labelColor=0d1117)

</div>

<br/>

---

## ◈ Overview

AnimeHub is a robust, full-stack MERN application designed for anime enthusiasts to discover, search, and manage a personalized collection of series. The platform features a secure, role-based architecture — standard users engage through social features while administrators get exclusive tools for content management and community moderation.

---

## ◈ Key Features

<table>
<tr>
<td width="50%">

**&#x2714; Secure Authentication**
JWT-based authentication with Bcrypt password hashing for secure, stateless session management.

**&#x2714; Dynamic Discovery**
Real-time search and multi-parameter filtering powered by MongoDB aggregation pipelines for optimised data retrieval.

**&#x2714; Social Interactions**
Atomic "Like" system and a hierarchical comment section with administrative pinning capabilities.

</td>
<td width="50%">

**&#x2714; Role-Based Access Control**
Distinct permissions for `user` and `admin` roles enforced via custom server-side middleware (`protect` & `adminOnly`).

**&#x2714; Asset Management**
Automated image processing and storage for anime covers using Multer and Express static routing.

**&#x2714; Performance**
MongoDB aggregation pipelines ensure fast, optimised queries even at scale.

</td>
</tr>
</table>

---

## ◈ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:----------|:--------|
| Frontend | React (Vite) | Component-driven UI with fast HMR |
| Styling | Tailwind CSS + Lucide React | Utility-first design with icon library |
| Backend | Node.js + Express.js | RESTful API architecture |
| Database | MongoDB + Mongoose | ODM with schema validation & population |
| Auth | JWT + Bcrypt | Stateless auth with secure password hashing |
| Uploads | Multer | Automated image processing & storage |

</div>

---

## ◈ Application Preview

<details>
<summary><b>Click to view screenshots</b></summary>

<br/>

**Hero Banner**
![Hero Banner](previewimages/herobanner.png)

**Explore Anime**
![Explore Anime](previewimages/exploreanime.png)

**Favorites**
![Favorites](previewimages/favorites.png)

**View Details**
![View Details](previewimages/viewdetails.png)

**Comment Section**
![Comment Section](previewimages/commentsection.png)

**Admin — Add Anime**
![Admin Add Anime](previewimages/adminanimeadd.png)

**Manage Anime**
![Manage Anime](previewimages/manginganime.png)

**Register Page**
![Register](previewimages/register.png)

**Login Page**
![Login](previewimages/loginpage.png)

</details>

---

## ◈ Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB (local or Atlas)

### 1 — Clone the repository
```bash
git clone https://github.com/your-username/animehub.git
cd animehub
```

### 2 — Backend setup
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
```bash
npm run dev
```

### 3 — Frontend setup
```bash
cd client
npm install
npm run dev
```

---

<div align="center">

## ◈ Author

**Nikesh S**

*Full Stack Developer — building scalable web applications with modern technologies.*

<br/>

[![GitHub](https://img.shields.io/badge/-GitHub-0d1117?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0d1117?style=for-the-badge&logo=linkedin&logoColor=0A66C2)](https://linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/-Portfolio-0d1117?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.com)

<br/>

*If you enjoy AnimeHub, drop a* ⭐ *— it means a lot!*

</div>
