# Real-Time Group Chat Backend

## Overview
Backend service for the real-time group chat application, built with Node.js, Express, and Socket.IO. Handles message persistence, user management, and real-time communication.

## Features
- WebSocket real-time communication
- Message storage and retrieval
- User session management
- Scalable server architecture

## Prerequisites
- Node.js (v16 or later)
- npm or Yarn
- MongoDB (recommended)

## Technologies Used
- Express.js
- Socket.IO
- Mongoose (MongoDB ODM)
- Cors
- Dotenv
- Winston (Logging)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Imranf620/algotix-task-backend
cd algotix-task-backend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the project root:
```
PORT=5000
MONGODB_URI= YOUR MONGODB URI
```

### 4. Running the Server
```bash
npm start
# or
yarn start

# Development mode
npm run dev
# or
yarn dev
```

## Deployment
[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Deployment Platforms
- Heroku
- DigitalOcean
- AWS EC2

## Project Structure
```
├── config/             # Configuration files
├── controller/        # Business logic
├── model/             # Database models
├── routes/             # API routes
├── services/           # Socket and service logic
├── utils/              # Utility functions
└── README.md           # Project documentation
```

## Environment Variables
- `PORT`: Server listening port
- `MONGO_URI`: MongoDB connection string

## API Endpoints
- `GET /api/messages`: Retrieve chat history
- `POST /api/send`: Send a new message

## Socket Events
- `join`: User joins chat
- `message`: Broadcast messages
- `disconnect`: Handle user disconnection
- `left`: User manually leaves chat

## Database Schema
### Message Model
```javascript
{
  userId: String,
  userName: String,
  messageBody: String,
  timeStamp: Date
}
```

## Performance Considerations
- Efficient database queries
- Minimal payload transmission
- Connection pooling
- Caching strategies

## Security Measures
- CORS configuration
- Input validation
- Secure WebSocket connections


## Scalability
- Socket.IO clustering

## Error Handling
- Centralized error management
- Comprehensive error logs
- Graceful error responses


```



## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Monitoring
- Recommended: 
  - Sentry for error tracking



## Contact
Imran Farooq
imranf620@gmail.com