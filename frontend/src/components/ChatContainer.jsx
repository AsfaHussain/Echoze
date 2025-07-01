import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages = [],
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser = {} } = useAuthStore();
  const messageEndRef = useRef(null);

   useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
     if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser?._id) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <p>Select a user to start chatting</p>
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className=" w-full flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
        {messages?.map((message) => {
          const isMe = message.senderId === authUser?._id;
          
          return (
            <div
              key={message._id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className="flex-shrink-0 h-10 w-10 rounded-full border overflow-hidden">
                  <img
                    src={
                      isMe
                        ? authUser?.profilepic || "/avatar.png"
                        : selectedUser?.profilepic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="h-full w-full object-cover"
                  />
                </div>

                
                <div className="flex flex-col">
                  
                  <span className={`text-xs text-gray-500 mb-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    {formatMessageTime(message.createdAt)}
                  </span>
                  
                  
                  <div
  className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
    isMe
      ? 'bg-gradient-to-tr from-pink-600 via-purple-900 to-indigo-600'
      : 'bg-gray-200 text-gray-800 rounded-bl-none'
  }`}
>
  {message.content?.image && (
    <img
      src={message.content.image}
      alt="Attachment"
      className="sm:max-w-[200px] rounded-md mb-2 ri"
    />
  )}
  {message.content?.text && (
    <p className="whitespace-pre-wrap">{message.content.text}</p>
  )}
</div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;