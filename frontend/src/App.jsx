import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";
//no dotenv
const socket = io.connect("http://localhost:5000");
const username = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, username});
    setMessage("");
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
      console.log(chat);
    })
  }, [chat])

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-lg">
        <div className="text-5xl mb-6 font-bold text-center">
          Chat App
        </div>
        <form action="sendChat" className="flex items-center space-x-4">
          <input
            type="text"
            name="chat"
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={sendChat}
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
        <div className="space-y-4 ">
          {chat.map((payload, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="text-blue-500">{payload.username}</div>
              <div>{payload.message}</div>
            </div>
          ))}
          </div>
      </div>
    </>
  );
}

export default App;
