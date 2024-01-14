import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIo } from "socket.io";

import { NextApiResponseServerIo } from "Lib/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIo(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Corregir aquí: escuchar el evento "updateChat" en el objeto socket
  
      socket.on("updateChat", (obj) => {
        
        socket.broadcast.emit("reciveMessage", {
          senderId: obj.senderId,
          receiverId: obj.receiverId,
          message: obj.message,
        });
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });
  }

  res.end();
};

export default ioHandler;
