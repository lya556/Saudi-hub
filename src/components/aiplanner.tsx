import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, X } from 'lucide-react';
import { askGeminiGuide } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface AIPlannerProps {
  currentContext?: string;
  onClose?: () => void;
}

export const AIPlanner: React.FC<AIPlannerProps> = ({ currentContext, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'مرحباً بك! أنا دليلك الذكي للمحميات السعودية. كيف يمكنني مساعدتك اليوم في التخطيط لرحلتك أو معرفة المزيد عن الطبيعة؟'
    }
  ]);
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

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askGeminiGuide(input, currentContext);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-100">
      <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-bold text-lg">المرشد الذكي</h3>
            <p className="text-xs text-emerald-200">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded-full transition-colors">
                <X className="w-5 h-5" />
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white text-stone-800 border border-gray-200 shadow-sm rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              <span className="text-xs text-gray-500">جاري التفكير...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="اسأل عن المحميات، الحيوانات، أو خطط رحلة..."
            className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-right"
            dir="rtl"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
