import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../Protected/SocketContext";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import aiLogo from "../../assets/Image/aiLogo.jpeg";
import {
  createMessage,
  fetchMessagesByChat,
  getOrCreateChatRoom,
  addSocketMessage,
} from "../../redux/slices/messageSlice";
import { getUserDetail } from "../../redux/slices/authUtlis";

const Chatbot = ({ propertyId, ownerId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const socket = useSocket();
  const chatbotRef = useRef(null);
  const { messages, currentRoom } = useSelector((state) => state.chat);
  const user = getUserDetail();

  // Join socket room & receive messages
useEffect(() => {
  if (!socket || !currentRoom?._id) return;

  socket.emit("joinRoom", {
    userId: user.userId,
    chatId: currentRoom._id, // ✅ send chatId
  });

  socket.on("receiveMessage", (data) => {
    dispatch(addSocketMessage(data));
  });

  return () => {
    socket.off("receiveMessage");
  };
}, [socket, currentRoom, dispatch]);

  // Initialize Chat
  const initializeChat = async () => {
    if (!user) return;

    const roomData = await dispatch(
      getOrCreateChatRoom({
        userId1: user.userId,
        userId2: ownerId,
        propertyId,
      })
    );

    if (roomData.payload?._id) {
      await dispatch(fetchMessagesByChat(roomData.payload._id));
      setIsOpen(true);
    }
  };

  // Send Message
  const sendMessage = async () => {
    if (!input.trim() || !currentRoom?._id) return;

    const message = {
      chatId: currentRoom._id,
      messageContent: input.trim(),
      senderId: user.userId,
      propertyId,
      ownerId,
      receiverId: ownerId,
      messageType: "text",
    };

    const result = await dispatch(createMessage(message));

    if (!result.error) {
      socket.emit("sendMessage", {
        ...result.payload,
      });
      setInput("");

      // Refetch messages from backend (GET API)
      dispatch(fetchMessagesByChat(currentRoom._id));
    }
  };

  // Close chat on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatbotRef.current && !chatbotRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatMessageDate = (date) => {
    const msgDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    if (isSameDay(msgDate, today)) return "Today";
    if (isSameDay(msgDate, yesterday)) return "Yesterday";

    return msgDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed bottom-4 right-6 z-[1000]">
      <button
        onClick={initializeChat}
        className="bg-[#25D366] p-3 rounded-full shadow-lg"
      >
        <FaRegCommentDots size={28} color="#fff" />
      </button>

      {isOpen && (
        <div
          ref={chatbotRef}
          className="mt-2 w-[90vw] max-w-[400px] h-[65vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="bg-[#112757] text-white py-3 px-4 flex items-center gap-3">
            <img
              src={aiLogo}
              alt="AI Avatar"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <div>
              <span className="text-base font-semibold">Chat Assistant</span>
              <br />
              <span className="text-xs text-green-200">Online</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
            {messages?.data?.map((msg, i, arr) => {
              const currentDate = formatMessageDate(msg.createdAt);
              const prevDate =
                i > 0 ? formatMessageDate(arr[i - 1].createdAt) : null;
              const showDateLabel = currentDate !== prevDate;

              return (
                <div key={i}>
                  {showDateLabel && (
                    <div className="text-center text-xs text-gray-500 my-2">
                      {currentDate}
                    </div>
                  )}
                  <div
                    className={`flex ${
                      msg.senderId._id === user?.userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg text-sm max-w-[80%] ${
                        msg.senderId._id === user?.userId
                          ? "bg-[#dcf8c6]"
                          : "bg-white border"
                      }`}
                    >
                      <p className="font-bold underline text-red-500">
                        {msg.senderId?.fullname}
                      </p>
                      <p>{msg.messageContent}</p>
                      <p className="text-[11px] text-gray-500 mt-1 text-right">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center px-3 py-2 border-t bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-full px-4 py-2 text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-[#075E54] text-white p-2 rounded-full"
            >
              <IoMdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
