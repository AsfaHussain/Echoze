import { useState, useEffect } from 'react';
import { Moon, Sun, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or prefer-color-scheme
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="h-screen min-w-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground">Customize how Chatty looks on your device</p>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg bg-background border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div className="text-left">
              <p className="font-medium">{theme === 'dark' ? 'Dark' : 'Light'} Mode</p>
              <p className="text-sm text-muted-foreground">
                {theme === 'dark' ? 'Dark background with light text' : 'Light background with dark text'}
              </p>
            </div>
          </button>
        </div>

        {/* Preview Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Preview</h3>
          <p className="text-sm text-muted-foreground">
            See how messages will appear in {theme === 'dark' ? 'dark' : 'light'} mode
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden shadow-sm">
          <div className="p-4">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className={`rounded-xl overflow-hidden border ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Chat Header */}
                <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                      J
                    </div>
                    <div>
                      <h3 className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        John Doe
                      </h3>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Online
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className={`p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3
                          ${message.isSent 
                            ? "bg-primary text-white" 
                            : theme === 'dark' 
                              ? "bg-gray-800 text-gray-100" 
                              : "bg-gray-100 text-gray-800"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-[10px] mt-1.5 ${message.isSent ? 'text-primary-200' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className={`p-4 border-t ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`flex-1 rounded-md border px-3 py-2 text-sm h-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="h-10 px-3 rounded-md bg-primary text-white">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;