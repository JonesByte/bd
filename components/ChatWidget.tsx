import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: 'Olá! Sou o assistente de IA do Byte Downloader. Posso te ajudar com dúvidas sobre downloads em 4K/8K, conversão por GPU, IA Upscaling de imagem local ou compra da licença vitalícia. Como posso te ajudar hoje?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Prepara o histórico para o backend em formato compatível
      const chatHistory = messages.concat(userMessage).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      // Chama a nossa API de chat no backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();

      setIsTyping(false);

      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            sender: 'agent',
            text: data.reply,
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(data.error || 'Erro na resposta do assistente');
      }
    } catch (error) {
      console.error('Erro de chat:', error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'agent',
          text: 'Desculpe, estou com dificuldades para me conectar ao servidor agora. Se precisar de ajuda imediata, por favor acesse nosso suporte no Discord!',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[520px] bg-[#0c1929]/95 backdrop-blur-md border border-byte-cyan/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-byte-surface/90 px-4 py-3 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-byte-cyan/20 border border-byte-cyan/50 flex items-center justify-center text-byte-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)] animate-pulse">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    Byte IA <Sparkles size={12} className="text-byte-highlight" />
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="text-[10px] text-gray-400">Online e pronta</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-byte-purple">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-byte-purple/40 border border-byte-purple/50 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-1.5">
                    <span>Byte IA está digitando</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-byte-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-byte-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-byte-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="bg-byte-surface/50 border-t border-white/10 p-3 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pergunte sobre recursos, preços, etc..."
                className="flex-1 bg-[#050C16]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-byte-cyan transition-colors"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 bg-byte-cyan hover:bg-byte-cyan/80 text-byte-navy rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:scale-105"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-byte-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:scale-110 transition-all duration-300 relative group z-50 text-byte-navy"
        title="Fale com nosso Agente IA"
      >
        <span className="absolute w-full h-full rounded-full bg-byte-cyan opacity-25 animate-ping"></span>
        <MessageSquare size={26} />
      </button>
    </div>
  );
};
