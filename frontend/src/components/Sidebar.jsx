import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) =>
      showOnlineOnly ? onlineUsers.includes(user._id) : true
    )
    .filter((user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 bg-white shadow-md flex flex-col transition-all duration-200 border-r border-gray-500">
      {/* Header */}
      <div className="w-full px-4 pt-5 pb-2 ">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-gray-700" />
          <span className="font-medium text-gray-800 hidden lg:block">Chats</span>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm focus:outline-none  text-gray-800"
        />

        {/* Online Filter Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="accent-blue-500"
            />
            Show online only
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2 px-2 space-y-2">
        {filteredUsers.map((user) => (
          <button
  key={user._id}
  onClick={() => setSelectedUser(user)}
  className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full transition-all duration-300
    ${
      selectedUser?._id === user._id
        ? "bg-gradient-to-br from-gray-400 to-gray-200 text-white shadow-lg"
        : "!bg-[#f0f0f3] text-gray-800 shadow-[9px_9px_16px_rgba(0,0,0,0.2),-9px_-9px_16px_rgba(255,255,255,0.7)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
    }`}
  >
          
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.profilepic || "/avatar.png"}
                alt={user.fullname}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* Info */}
            <div className="hidden lg:block text-left truncate">
              <div className="font-semibold truncate">
                {user.fullname}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-4 text-sm">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
