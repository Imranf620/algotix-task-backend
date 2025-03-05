import Message from "../model/messageModel.js";

export const socketServer = (io) => {
  const onlineUsers = new Map();
  const messageLock = new Set();

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      socket.userId = data.userId;
      socket.userName = data.userName;

      onlineUsers.set(socket.id, data);

      const systemMessage = {
        userId: "system",
        userName: "System",
        messageBody: `${data.userName} joined the chat`,
        timeStamp: new Date().toISOString()
      };

      try {
        await Message.create(systemMessage);
        
        io.emit("userJoined", data);
        io.emit("message", systemMessage);
        io.emit("onlineUsers", Array.from(onlineUsers.values()));
      } catch (error) {
        console.error("Error processing join:", error);
      }
    });

    socket.on("message", async (data) => {
      if (messageLock.has(data.timeStamp)) return;
      
      messageLock.add(data.timeStamp);
      
      try {
        const savedMessage = await Message.create(data);
        io.emit("message", savedMessage);
        
        setTimeout(() => messageLock.delete(data.timeStamp), 1000);
      } catch (error) {
        console.error("Error saving message:", error);
        messageLock.delete(data.timeStamp);
      }
    });

    socket.on("left", async (data) => {
      onlineUsers.delete(socket.id);

      const systemMessage = {
        userId: "system",
        userName: "System",
        messageBody: `${data.userName} left the chat`,
        timeStamp: new Date().toISOString()
      };

      try {
        await Message.create(systemMessage);
        
        io.emit("userLeft", data);
        io.emit("message", systemMessage);
        io.emit("onlineUsers", Array.from(onlineUsers.values()));
      } catch (error) {
        console.error("Error processing left:", error);
      }
    });

    socket.on("disconnect", async () => {
      if (socket.userName) {
        onlineUsers.delete(socket.id);

        const systemMessage = {
          userId: "system",
          userName: "System",
          messageBody: `${socket.userName} left the chat`,
          timeStamp: new Date().toISOString()
        };

        try {
          await Message.create(systemMessage);
          
          io.emit("userLeft", { 
            userId: socket.userId, 
            userName: socket.userName 
          });
          io.emit("message", systemMessage);
          io.emit("onlineUsers", Array.from(onlineUsers.values()));
        } catch (error) {
          console.error("Error processing disconnect:", error);
        }
      }
    });
  });
};