import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ChatWidget() {
  const { isRTL } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: isRTL ? 'مرحبًا! 👋 كيف يمكنني مساعدتك اليوم؟' : 'Hello! 👋 How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const botReplies = isRTL ? [
    'شكرًا لتواصلك! سيقوم فريقنا بالرد عليك قريبًا.',
    'يمكنك تصفح منتجاتنا المميزة في صفحة المنتجات.',
    'للمساعدة في الطلب، يرجى زيارة صفحة حسابي > طلباتي.',
    'نقدم شحن مجاني للطلبات فوق 200 ر.س!',
    'استخدم كود WELCOME20 للحصول على خصم 20% على أول طلب!'
  ] : [
    'Thanks for reaching out! Our team will reply soon.',
    'You can browse our featured products on the Products page.',
    'For order help, visit My Account > Orders.',
    'We offer free shipping on orders over 200 SAR!',
    'Use code WELCOME20 for 20% off your first order!'
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all animate-pulse-glow`}
        id="chat-widget-btn"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-50 w-80 sm:w-96 glass-strong rounded-2xl border border-[#2A2A5A] shadow-2xl animate-slide-up overflow-hidden`} id="chat-window">
          {/* Header */}
          <div className="gradient-bg p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{isRTL ? 'دعم سوق ستور' : 'SouqStore Support'}</h4>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                {isRTL ? 'متصل الآن' : 'Online now'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === 'user'
                    ? 'gradient-bg text-white rounded-br-md rtl:rounded-br-2xl rtl:rounded-bl-md'
                    : 'bg-[#1A1A3E] text-[#E8E8F0] rounded-bl-md rtl:rounded-bl-2xl rtl:rounded-br-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#2A2A5A] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRTL ? 'اكتب رسالتك...' : 'Type a message...'}
              className="input !rounded-full !py-2.5 !text-sm flex-1"
              id="chat-input"
            />
            <button type="submit" className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white shrink-0 hover:opacity-90 transition-opacity" id="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
