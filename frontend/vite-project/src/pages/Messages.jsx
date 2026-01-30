import { Phone, Video, Settings, Search, Send } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Messages() {
  // ✅ Sidebar state
  const [activeSection, setActiveSection] = useState("messages");

  // Chats
  const [chats] = useState([
    { name: "Iliash Hossain", active: true },
    { name: "Abu Bin Ishtiyak" },
    { name: "George Philips" },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);

  const [messages, setMessages] = useState([
    { text: "Hello! 👋", isSent: false, sender: "Iliash Hossain", time: "10:30 AM" },
    { text: "I found an issue when trying to purchase the product.", isSent: false, sender: "Iliash Hossain", time: "10:32 AM" },
    { text: "Thanks! It’s fixed now.", isSent: true, sender: "You", time: "10:35 AM" },
    { text: "Perfect, thank you!", isSent: false, sender: "Iliash Hossain", time: "10:36 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { text: newMessage, isSent: true, sender: "You", time: "Now" }]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-gray-100 to-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-24 bg-gray-800 min-h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Chats List */}
        <aside className="w-80 bg-white shadow-lg flex flex-col border-r">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-700">Chats</h2>
          </div>

          <div className="p-4">
            <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-2 hover:bg-gray-200 transition">
              <Search size={18} className="text-gray-400" />
              <input
                placeholder="Search"
                className="ml-2 bg-transparent outline-none text-sm w-full placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, i) => (
              <div
                key={i}
                onClick={() => setActiveChat(chat)}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors rounded-lg mb-1 ${
                  activeChat.name === chat.name ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm">
                  {chat.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-gray-700">{chat.name}</p>
                  <p className="text-xs text-gray-400 truncate">Last message preview…</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-50">
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-3 bg-white shadow-sm border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                {activeChat.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{activeChat.name}</h3>
                <p className="text-xs text-green-500">Active 35m ago</p>
              </div>
            </div>
            <div className="flex gap-3 text-gray-500">
              <Phone className="cursor-pointer hover:text-green-500 transition" />
              <Video className="cursor-pointer hover:text-green-500 transition" />
              <Settings className="cursor-pointer hover:text-green-500 transition" />
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isSent ? "justify-end" : "justify-start"} items-end gap-2`}>
                {!msg.isSent && (
                  <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                    {msg.sender.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <div className={`px-4 py-2 rounded-2xl shadow-md max-w-xs break-words ${
                  msg.isSent ? "bg-gradient-to-br from-green-400 to-green-500 text-white" : "bg-white text-gray-800"
                }`}>
                  {!msg.isSent && <div className="text-xs font-semibold mb-1">{msg.sender}</div>}
                  {msg.text}
                  <div className="text-[10px] text-gray-400 mt-1 text-right">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-300 transition">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 p-2 rounded-full text-white transition"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
