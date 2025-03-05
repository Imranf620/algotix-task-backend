import express from "express";
import connectDb from "./config/database.js";
import { createServer } from "http";
import { socketServer } from "./services/socket.js";
import { Server } from "socket.io";
import "dotenv/config";
import messageRoutes from "./routes/messageRoute.js";
import error from "./middleware/error.js";
import cors from "cors";

const app = express();

app.use(express.json());
const server = createServer(app);
const port = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, server ! ");
});

app.use("/api", messageRoutes);

socketServer(io);

app.use(error);

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
  connectDb();
});
