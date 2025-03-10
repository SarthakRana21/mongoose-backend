# 🎥 Backend API with Mongoose - Subscribers, Users & Videos

## 📌 Overview
This is a **Node.js** backend project using **Express.js** and **MongoDB (Atlas)** for managing users, subscribers, and videos. The backend includes **CRUD operations**, **authentication**, and **aggregation pipelines** for efficient data retrieval.

---
## 🚀 Features
- **User Authentication** (JWT-based)
- **User Management**
- **Subscriber Management**
- **Video Upload**
- **Mongoose Aggregation Pipelines** for data processing
- **Middleware for Error Handling, Image upload & Authentication**

---
## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://your-db-connection
JWT_SECRET=your-secret-key
```

### 4️⃣ Start the Server
```sh
npm start
```
Server will run on `http://localhost:5000`.

---
## 📂 Project Structure
```
├───public
│   └───temp
│           .gitkeep
│
└───src
    │   app.ts
    │   constant.ts
    │   index.ts
    │
    ├───controllers
    │       channel.controller.ts
    |       like.controller.ts
    │       user.controller.ts
    │
    ├───db
    │       db.ts
    │
    ├───interface
    |       authRequest.interface.ts
    |
    ├───middlewares
    │       auth.middleware.ts
    │       multer.middleware.ts
    │
    ├───models
    |       comment.model.ts
    |       like.model.ts
    |       playlist.model.ts
    │       subscription.model.ts
    │       user.model.ts
    │       video.model.ts
    │
    ├───routes
    │       channel.routes.ts
    |       like.routes.ts
    │       user.routes.ts
    │
    └───utils
            ApiError.ts
            ApiResponse.ts
            asyncHandler.ts
            cloudinary.ts
```

---
## 📡 API Endpoints
### **User Routes**
| Method | Route | Description |
|--------|------------------------------|--------------------------|
| POST   | `/api/v1/users/register`     | Register new user       |
| POST   | `/api/v1/users/login`        | Login user              |
| POST   | `/api/v1/users/logout`       | Logout user             |
| PATCH  | `/api/v1/users/change-password` | Change user password   |
| PUT    | `/api/v1/users/edit-user-details` | Edit user details   |
| DELETE | `/api/v1/users/delete-user`  | Delete user account     |
| POST   | `/api/v1/users/update-image` | Update user image       |
| GET    | `/api/v1/users/watch-history` | Get user watch history |

### **Channel Routes**
| Method | Route | Description |
|--------|------------------------------|--------------------------|
| GET    | `/api/v1/channel/:username`  | Get channel by username |


---
## 🔗 Technologies Used
- **Node.js & Express.js** (Backend Framework)
- **MongoDB Atlas & Mongoose** (Database & ORM)
- **JWT Authentication** (Secure Login)
- **Multer** (File Uploads)
- **Cloudinary** (Video Storage)

---
## 🤝 Contributing
Feel free to **fork this repository** and submit a **pull request**!

---
## ⭐ Support
If you like this project, give it a ⭐ on GitHub!

