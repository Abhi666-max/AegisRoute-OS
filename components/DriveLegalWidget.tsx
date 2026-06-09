'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Gavel } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function DriveLegalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am DriveLegal AI. Select your BIMSTEC jurisdiction and ask me any road safety compliance or legal question.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg, countryCode }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error retrieving the legal documents.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Please check your network.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 border-4 border-slate-50"
        >
          <Gavel size={32} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] md:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden shadow-slate-900/10">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Gavel size={20} className="text-blue-400" />
              </div>
              <div>
                <span className="block font-bold tracking-tight leading-none">DriveLegal AI</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">Compliance Engine</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-md hover:bg-slate-700">
              <X size={18} />
            </button>
          </div>

          {/* Context Selector */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jurisdiction</span>
            <select 
              value={countryCode} 
              onChange={(e) => setCountryCode(e.target.value)}
              className="text-sm font-medium bg-white border border-slate-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
            >
              <option value="IN">🇮🇳 India (IN)</option>
              <option value="NP">🇳🇵 Nepal (NP)</option>
              <option value="BT">🇧🇹 Bhutan (BT)</option>
              <option value="BD">🇧🇩 Bangladesh (BD)</option>
              <option value="LK">🇱🇰 Sri Lanka (LK)</option>
              <option value="TH">🇹🇭 Thailand (TH)</option>
              <option value="MM">🇲🇲 Myanmar (MM)</option>
            </select>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-4 shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-2 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query the compliance DB..."
                className="flex-1 bg-transparent outline-none text-sm px-2 py-1 placeholder:text-slate-400 text-slate-700 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-sm"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
