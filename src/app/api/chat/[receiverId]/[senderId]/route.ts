import User from "models/User";


export async function GET(
  request: Request,
  { params }: { params: { receiverId: string; senderId: string } }
) {
  const { receiverId, senderId } = params;
  const conversationId = `${senderId}-${receiverId}`;
  const conversationId2 = `${receiverId}-${senderId}`;

  // Busca un chat existente entre los dos participantes utilizando el $or
  const currentChat = await User.findOne({
    $and: [
      { _id: senderId },
      {
        $or: [
          { "chats.conversationId": conversationId },
          { "chats.conversationId": conversationId2 },
        ],
      },
    ],
  }).select("chats");

  // Si no se encuentra el chat, devuelve una respuesta vacía
  if (!currentChat) return Response.json({});

  // Extrae el chat específico del array de chats
  const foundChat = currentChat.chats.find(
    (chat:any) =>
      chat.conversationId === conversationId || chat.conversationId === conversationId2
  );
  // Devuelve solo el chat encontrado
  return Response.json(foundChat);
}


export async function POST(
  request: Request,
  { params }: { params: { receiverId: string, senderId: string } }
) {
  const { receiverId, senderId } = params;
  const { message } = await request.json();

  // Busca un chat existente entre los dos participantes
  const existingChat = await User.findOne({
    $and: [
      { _id: receiverId },
      { 'chats.participants': { $all: [senderId, receiverId] } },
    ],
  });

  if (existingChat) {
    // Si existe un chat, agrega el nuevo mensaje al array de mensajes
    await User.findOneAndUpdate(
      {
        _id: receiverId,
        'chats.participants': { $all: [senderId, receiverId] },
      },
      {
        $push: {
          'chats.$.messages': {
            sender: senderId,
            message: message,
            read: false,
          },
        },
      }
    );

    await User.findOneAndUpdate(
      {
        _id: senderId,
        'chats.participants': { $all: [senderId, receiverId] },
      },
      {
        $push: {
          'chats.$.messages': {
            sender: senderId,
            message: message,
            read: false,
          },
        },
      }
    );

    
  } else {
    // Si no existe un chat, crea uno nuevo
    const newMessage = {
      sender: senderId,
      message: message,
      read: false,
    };
    const newChat = {
      participants: [senderId, receiverId],
      conversationId: `${senderId}-${receiverId}`,
      status: "active",
      messages: [newMessage],
    };

    await User.findByIdAndUpdate(receiverId, {
      $push: {
        chats: newChat,
      },
    });

    await User.findByIdAndUpdate(senderId, {
      $push: {
        chats: newChat,
      },
    });
  }

  return Response.json({
    receiver: receiverId,
    message,
    sender: senderId,
  });
}


const methods = {
  _id: {
    $oid: "65a3385d998f3d500b3f0377",
  },
  username: "PATRICIA REYES PASQUEL",
  email: "patricia14reyes@hotmail.com",
  chats: [
    {
      participants: ["65a3385d998f3d500b3f0377", "65a29cebd834ac9000ab058e"],
      status: "active",
      messages: [
        {
          sender: "65a3385d998f3d500b3f0377",
          read: false,
          _id: {
            $oid: "65a3604d5c62788a7681820a",
          },
          createdAt: {
            $date: "2024-01-14T04:17:17.787Z",
          },
          updatedAt: {
            $date: "2024-01-14T04:17:17.787Z",
          },
        },
        {
          sender: "65a3385d998f3d500b3f0377",
          read: false,
          _id: {
            $oid: "65a360f25c62788a76818253",
          },
          createdAt: {
            $date: "2024-01-14T04:20:02.328Z",
          },
          updatedAt: {
            $date: "2024-01-14T04:20:02.328Z",
          },
        },
      ],
      _id: {
        $oid: "65a3604d5c62788a76818209",
      },
      createdAt: {
        $date: "2024-01-14T04:17:17.787Z",
      },
      updatedAt: {
        $date: "2024-01-14T04:17:17.787Z",
      },
    },
  ],
  createdAt: {
    $date: "2024-01-14T01:26:53.991Z",
  },
  updatedAt: {
    $date: "2024-01-14T04:20:02.328Z",
  },
  __v: 0,
};
