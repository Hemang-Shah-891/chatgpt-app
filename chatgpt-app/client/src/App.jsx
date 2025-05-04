import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: "user", content: message };
    setChat([...chat, userMsg]);
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message,
      });
      const aiMsg = { role: "assistant", content: res.data.reply };
      setChat((prev) => [...prev, aiMsg]);
      setMessage("");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/meta-profiles");
        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Meta Profiles</h2>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <img
                src={profile.picture.data.url}
                alt={profile.name}
                width="50"
                height="50"
              />
              <span>{profile.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-container">
        <h1>Chat with GPT</h1>
        <div className="chat-box">
          {chat.map((msg, i) => (
            <div key={i} className={msg.role}>
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
