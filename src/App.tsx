import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MessageSquarePlus, 
  Settings, 
  User, 
  MessageCircle, 
  MoreHorizontal, 
  ShoppingBag,
  ChevronLeft,
  Menu,
  Plus,
  Smile,
  Hash,
  Pin,
  BellOff,
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react';

// --- Mock Data ---
const MOCK_CHATS = [
  {
    id: '1',
    name: 'BAPE',
    members: 3,
    lastMessage: 'ㅇ',
    time: '3월 11일',
    unread: 0,
    isPinned: true,
    isMuted: true,
    avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'],
  },
  {
    id: '2',
    name: 'BAPE ENT.',
    members: 3,
    lastMessage: '사진 8장을 보냈습니다.',
    time: '2025. 11. 26.',
    unread: 0,
    isPinned: true,
    isMuted: false,
    avatars: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5'],
  },
  {
    id: '3',
    name: '💗',
    members: 0,
    lastMessage: '뭐해?',
    time: '오전 8:05',
    unread: 0,
    isPinned: false,
    isMuted: false,
    avatars: ['https://i.pravatar.cc/150?u=10'],
  },
  {
    id: '4',
    name: 'BAPE 김우현',
    members: 0,
    lastMessage: '옹옹. 낼 5시쯤 집앞으로 갈게~',
    time: '어제',
    unread: 0,
    isPinned: false,
    isMuted: false,
    avatars: ['https://i.pravatar.cc/150?u=6'],
  },
  {
    id: '5',
    name: 'BAPE 하도성',
    members: 0,
    lastMessage: '오늘 연습 몇 시야?',
    time: '4월 13일',
    unread: 0,
    isPinned: false,
    isMuted: false,
    avatars: ['https://i.pravatar.cc/150?u=11'],
  },
  {
    id: '6',
    name: '서누',
    members: 0,
    lastMessage: '형 밥 먹었어요?',
    time: '4월 13일',
    unread: 0,
    isPinned: false,
    isMuted: false,
    avatars: ['https://i.pravatar.cc/150?u=12'],
    isBlocked: true,
  },
];

const MOCK_MESSAGES = {
  '1': [
    { id: 'm1', type: 'system', text: '2024년 3월 11일 월요일' },
    { id: 'm2', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '아니 ㅈㄴ황당해', time: '오후 10:07', isMe: false, unreadCount: 1 },
    { id: 'm3', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '10년동안 당연히 날 책임져야겠지', time: '오후 10:08', isMe: false, unreadCount: 1 },
    { id: 'm4', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '30대가되면 더 치열하게 나를 책임져야겠지 ㅅ발', time: '오후 10:08', isMe: false, unreadCount: 1 },
    { id: 'm5', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '뭔 내 인생흐름을 간단정리했다는거야? 그냥 모든사람의 인생이그렇잖아', time: '오후 10:08', isMe: false, unreadCount: 1 },
    { id: 'm6', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '40대가되면더더욱치열하게나를책임지고노후를대비하겠지', time: '오후 10:09', isMe: false, unreadCount: 1 },
    { id: 'm7', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '존나당연한말하고릿어', time: '오후 10:09', isMe: false, unreadCount: 1 },
    { id: 'm8', senderId: 'user2', senderName: '🤓 사이코패스', avatar: 'https://i.pravatar.cc/150?u=2', text: 'ㅋㅋㅋㅋㅋㅋㅋ', time: '오후 10:10', isMe: false, unreadCount: 1 },
    { id: 'm9', senderId: 'user2', senderName: '🤓 사이코패스', avatar: 'https://i.pravatar.cc/150?u=2', text: '장점고 ㅏ 단점', time: '오후 10:10', isMe: false, unreadCount: 1 },
    { id: 'm10', senderId: 'user2', senderName: '🤓 사이코패스', avatar: 'https://i.pravatar.cc/150?u=2', text: '말해달라고해봐', time: '오후 10:10', isMe: false, unreadCount: 1 },
    { id: 'm11', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: '성격적 강약점 알려달라햇어', time: '오후 10:24', isMe: false, unreadCount: 1 },
    { id: 'm12', senderId: 'user1', senderName: '너굴맨', avatar: 'https://i.pravatar.cc/150?u=1', text: 'ㅅ발', time: '오후 10:24', isMe: false, unreadCount: 1 },
    { id: 'm13', senderId: 'me', senderName: '나', avatar: '', text: 'ㅇ', time: '오후 10:25', isMe: true, unreadCount: 1 },
  ],
  '6': [
    { id: 'm1', type: 'system', text: '2025년 3월 31일 월요일' },
    { id: 'm2', senderId: 'user12', senderName: '서누', avatar: 'https://i.pravatar.cc/150?u=12', text: '보이스톡', time: '오후 8:48', isMe: false, isCall: true },
    { id: 'm3', senderId: 'user12', senderName: '서누', avatar: 'https://i.pravatar.cc/150?u=12', text: '부재중', time: '오후 8:49', isMe: false, isCall: true },
  ]
};

// --- Components ---

const AvatarGroup = ({ avatars, isOfficial, name }: { avatars: string[], isOfficial?: boolean, name: string }) => {
  if (isOfficial) {
    // Generate a colored circle based on name for official accounts since we don't have real logos
    const colors = ['bg-yellow-400', 'bg-teal-400', 'bg-yellow-300'];
    const color = name.includes('페이') ? colors[0] : name.includes('배달') ? colors[1] : colors[2];
    return (
      <div className={`w-12 h-12 rounded-[20px] ${color} flex items-center justify-center text-xl font-bold text-black/60 shrink-0`}>
        {name.charAt(0)}
      </div>
    );
  }

  if (avatars.length === 1) {
    return <img src={avatars[0]} alt="avatar" className="w-12 h-12 rounded-[20px] object-cover shrink-0" />;
  }
  
  if (avatars.length === 2) {
    return (
      <div className="w-12 h-12 relative shrink-0">
        <img src={avatars[0]} className="w-8 h-8 rounded-[14px] absolute top-0 left-0 object-cover z-10 border-2 border-white" />
        <img src={avatars[1]} className="w-8 h-8 rounded-[14px] absolute bottom-0 right-0 object-cover" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 relative shrink-0 grid grid-cols-2 gap-0.5 rounded-[20px] overflow-hidden bg-gray-200">
       {avatars.slice(0, 4).map((src, i) => (
         <img key={i} src={src} className="w-full h-full object-cover" />
       ))}
    </div>
  );
};

export default function App() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messagesData, setMessagesData] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);
  const messages = activeChatId ? messagesData[activeChatId as keyof typeof messagesData] || [] : [];

  const getLastMessage = (chatId: string) => {
    const msgs = messagesData[chatId as keyof typeof messagesData];
    if (msgs && msgs.length > 0) {
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg.type !== 'system') return lastMsg.text;
    }
    return "";
  };

  const getLastTime = (chatId: string) => {
    const msgs = messagesData[chatId as keyof typeof messagesData];
    if (msgs && msgs.length > 0) {
      const lastMsg = msgs[msgs.length - 1];
      return lastMsg.time || "";
    }
    return "";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChatId) return;
    
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: '나',
      avatar: '',
      text: inputValue,
      time: new Date().toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' }),
      isMe: true
    };

    setMessagesData(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId as keyof typeof prev] || []), newMessage]
    }));
    setInputValue('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeChatId) {
      scrollToBottom();
    }
  }, [messages, activeChatId]);

  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans overflow-hidden justify-center items-center">
      <div className="w-full h-full sm:max-w-[774px] bg-white relative shadow-2xl flex flex-col overflow-hidden sm:border sm:border-gray-200">
        
        {!activeChatId ? (
          /* --- Chat List --- */
          <div className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <h1 className="text-[22px] font-bold text-gray-900">채팅</h1>
              <div className="flex items-center space-x-4 text-gray-800">
                <Search className="w-6 h-6 cursor-pointer" />
                <MessageSquarePlus className="w-6 h-6 cursor-pointer" />
                <Settings className="w-6 h-6 cursor-pointer" />
              </div>
            </div>



            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors`}
                >
                  <AvatarGroup avatars={chat.avatars} isOfficial={chat.isOfficial} name={chat.name} />
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center space-x-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-gray-900 truncate">{chat.name}</h3>
                        {chat.members > 0 && (
                          <span className="text-gray-400 text-sm">{chat.members}</span>
                        )}
                        {chat.isPinned && <Pin className="w-3.5 h-3.5 text-gray-400 fill-gray-400" />}
                        {chat.isMuted && <BellOff className="w-3.5 h-3.5 text-gray-400" />}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{getLastTime(chat.id)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-500 truncate pr-2">{getLastMessage(chat.id)}</p>
                      {chat.unread > 0 && (
                        <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="h-16 border-t border-gray-200 flex items-center justify-around px-2 bg-gray-50 shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-800"><User className="w-7 h-7" fill="currentColor" /></button>
              <button className="p-2 text-gray-800 relative">
                <MessageCircle className="w-7 h-7" fill="currentColor" />
                <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-gray-50">28</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-800"><MessageSquarePlus className="w-7 h-7" fill="currentColor" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-800 relative">
                <ShoppingBag className="w-7 h-7" fill="currentColor" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-800 relative">
                <MoreHorizontal className="w-7 h-7" />
                <span className="absolute top-2 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        ) : (
          /* --- Chat Room --- */
          <div className="w-full h-full flex flex-col bg-[#b2c7d9] relative">
            
            {/* Chat Header */}
            <div className="h-14 bg-[#b2c7d9]/90 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-10">
              <div className="flex items-center space-x-3">
                <button onClick={() => setActiveChatId(null)} className="text-gray-800 flex items-center">
                  <ChevronLeft className="w-7 h-7" />
                  <span className="text-xl font-medium -ml-1">28</span>
                </button>
                <div className="flex items-center space-x-1">
                  <h2 className="text-lg font-semibold text-gray-900">{activeChat?.name}</h2>
                  {activeChat && activeChat.members > 0 && (
                    <span className="text-gray-600 font-medium">{activeChat.members}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-800">
                <Search className="w-6 h-6 cursor-pointer" />
                <Menu className="w-6 h-6 cursor-pointer" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              
              {/* Blocked User Warning */}
              {activeChat?.isBlocked && (
                <div className="mb-4">
                  <div className="bg-white rounded-lg shadow-sm flex divide-x divide-gray-200 mb-2">
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-gray-700 font-medium">
                      <UserPlus className="w-5 h-5" />
                      <span>추가</span>
                    </button>
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-gray-700 font-medium">
                      <Ban className="w-5 h-5" />
                      <span>차단</span>
                    </button>
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-red-500 font-medium">
                      <AlertTriangle className="w-5 h-5" />
                      <span>신고</span>
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-[13px] leading-relaxed">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-800">
                          친구로 등록되지 않은 사용자입니다. 금전 요구 등으로 인한 피해를 입지 않도록 주의해 주세요.
                        </p>
                        <a href="#" className="text-blue-500 mt-1 inline-block">주의사항 보기</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg, index) => {
                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-4">
                      <span className="bg-black/10 text-white text-xs px-3 py-1 rounded-full">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isFirstInGroup = index === 0 || messages[index - 1].senderId !== msg.senderId || messages[index - 1].type === 'system';
                const isLastInGroup = index === messages.length - 1 || messages[index + 1].senderId !== msg.senderId || messages[index + 1].time !== msg.time;

                return (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? 'mt-4' : 'mt-1'}`}>
                    
                    {/* Avatar for others */}
                    {!msg.isMe && (
                      <div className="w-10 shrink-0 mr-2">
                        {isFirstInGroup && (
                          <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-[16px] object-cover" />
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                      {/* Sender Name */}
                      {!msg.isMe && isFirstInGroup && (
                        <span className="text-xs text-gray-600 mb-1 ml-1">{msg.senderName}</span>
                      )}
                      
                      <div className={`flex items-end ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Message Bubble */}
                        <div 
                          className={`
                            px-3 py-2 text-[15px] leading-relaxed break-words shadow-sm flex items-center space-x-2
                            ${msg.isMe ? 'bg-[#fee500] text-black rounded-l-lg rounded-tr-lg' : 'bg-white text-black rounded-r-lg rounded-tl-lg'}
                            ${!isFirstInGroup && msg.isMe ? 'rounded-tr-md' : ''}
                            ${!isFirstInGroup && !msg.isMe ? 'rounded-tl-md' : ''}
                          `}
                        >
                          {msg.isCall ? (
                            <>
                              {msg.text === '보이스톡' ? <Phone className="w-5 h-5 text-green-500" /> : <PhoneMissed className="w-5 h-5 text-gray-400" />}
                              <span className="font-medium">{msg.text}</span>
                            </>
                          ) : (
                            msg.text
                          )}
                        </div>
                        
                        {/* Time & Unread */}
                        <div className={`flex flex-col ${msg.isMe ? 'items-end mr-2' : 'items-start ml-2'} justify-end mb-0.5`}>
                          {msg.unreadCount > 0 && (
                            <span className="text-[#fee500] text-[11px] font-bold drop-shadow-[0_0_1px_rgba(0,0,0,0.5)] mb-0.5">
                              {msg.unreadCount}
                            </span>
                          )}
                          {isLastInGroup && (
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">
                              {msg.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button (Mock) */}
            <button className="absolute bottom-20 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10">
              <ChevronDown className="w-6 h-6" />
            </button>

            {/* Input Area */}
            <div className="bg-white px-3 py-2 flex items-end space-x-2 shrink-0">
              <button className="p-2 text-gray-500 hover:text-gray-700 shrink-0 mb-0.5">
                <Plus className="w-6 h-6" />
              </button>
              <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 min-h-[40px]">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="메시지 입력" 
                  className="flex-1 bg-transparent outline-none text-[15px]"
                />
                <button onClick={handleSendMessage} className="text-gray-500 hover:text-gray-700 ml-2">
                  <Smile className="w-6 h-6" />
                </button>
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 shrink-0 mb-0.5">
                <Hash className="w-6 h-6" />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
