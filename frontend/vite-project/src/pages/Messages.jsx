import { Phone, Video, Settings, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Messages() {
  const [activeSection, setActiveSection] = useState("messages");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [allMessages, setAllMessages] = useState([]); // from DB
  const [activeChat, setActiveChat] = useState(null); // selected message document
  const [search, setSearch] = useState("");

  // ✅ fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("http://localhost:5000/api/contact/messages");
        const items = res.data?.data || [];

        setAllMessages(items);
        setActiveChat(items[0] || null);
      } catch (e) {
        setError("Failed to load messages.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // ✅ filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allMessages;
    return allMessages.filter((m) => {
      return (
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
      );
    });
  }, [allMessages, search]);

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U";

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
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
            <h2 className="text-xl font-bold text-gray-700">Messages</h2>
          </div>

          <div className="p-4">
            <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-2 hover:bg-gray-200 transition">
              <Search size={18} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name/email/message"
                className="ml-2 bg-transparent outline-none text-sm w-full placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {loading && <p className="px-3 text-sm text-gray-500">Loading...</p>}
            {error && <p className="px-3 text-sm text-red-500">{error}</p>}
            {!loading && !error && filtered.length === 0 && (
              <p className="px-3 text-sm text-gray-500">No messages found.</p>
            )}

            {filtered.map((m) => (
              <div
                key={m._id}
                onClick={() => setActiveChat(m)}
                className={`px-3 py-3 cursor-pointer flex items-center gap-3 transition-colors rounded-xl mb-2 ${
                  activeChat?._id === m._id ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm">
                  {initials(m.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-700 truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.email}</p>
                  <p className="text-xs text-gray-400 truncate">{m.message}</p>
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
                {initials(activeChat?.name)}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm truncate">
                  {activeChat?.name || "No message selected"}
                </h3>
                <p className="text-xs text-gray-500 truncate">{activeChat?.email || ""}</p>
              </div>
            </div>

            <div className="flex gap-3 text-gray-500">
              <Phone className="cursor-pointer hover:text-green-500 transition" />
              <Video className="cursor-pointer hover:text-green-500 transition" />
              <Settings className="cursor-pointer hover:text-green-500 transition" />
            </div>
          </header>

          {/* Message body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {!activeChat ? (
              <div className="text-center text-gray-500 mt-10">No messages yet.</div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Full Name</p>
                      <p className="font-semibold text-gray-800">{activeChat.name}</p>

                      <p className="text-xs text-gray-400 mt-3">Email</p>
                      <p className="font-medium text-gray-700">{activeChat.email}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Received</p>
                      <p className="text-xs text-gray-600">{formatDate(activeChat.createdAt)}</p>
                    </div>
                  </div>

                  <hr className="my-5" />

                  <p className="text-xs text-gray-400">Message</p>
                  <p className="text-gray-800 leading-7 whitespace-pre-wrap mt-1">
                    {activeChat.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
