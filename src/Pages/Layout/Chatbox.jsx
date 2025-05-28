import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        className="btn rounded-full p-3 mb-4 shadow-lg"
        onClick={toggleChatbot}
        title={isOpen ? "Close Chatbot" : "Open Chatbot"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#25D366",
        }}
      >
        <FaRegCommentDots size={40} color="#fff" />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "90vw",
            maxWidth: "400px",
            height: "40vh",
            minHeight: "200px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              background: "#005A9C",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Chatbot
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "1rem",
            }}
          >
            <p className="text-[#005555]">Welcome! How can I help you?</p>
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
              background: "#f9f9f9",
            }}
          >
            <button
              className="btn btn-outline-secondary bg-white btn-sm"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "0 8px",
                marginRight: "4px",
              }}
            >
              <i className="fas fa-microphone"></i>
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "1rem",
              }}
            />
            <button
              className="btn btn text-white p-1 rounded"
              style={{
                backgroundColor: "#005555",
                borderRadius: "6px",
                padding: "0 16px",
                fontSize: "1rem",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
