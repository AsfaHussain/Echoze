import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 bg-white shadow-md backdrop-blur-sm transition-all duration-200 z-10">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative text-white">
              <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-gray-700">{selectedUser.fullname}</h3>
            <p className="text-sm text-base-content/70 text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
                                                
        {/* Close button */}

        <button onClick={() => setSelectedUser(null)} className="shadow-lg">
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
