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
  ChevronDown,
  UserPlus,
  Ban,
  AlertTriangle,
  Phone,
  PhoneMissed,
  X
} from 'lucide-react';

// --- Mock Data ---
const MOCK_CHATS = [
  {
    id: '1',
    name: 'BAPE',
    members: 5,
    lastMessage: 'ㅇ',
    time: '3월 11일',
    unread: 0,
    isPinned: true,
    isMuted: false,
    avatars: ['https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', 'https://i.postimg.cc/nhW91f6R/jangseon-u.png'],
  },
  {
    id: '2',
    name: 'BAPE ENT.',
    members: 8,
    lastMessage: '사진 8장을 보냈습니다.',
    time: '2025. 11. 26.',
    unread: 0,
    isPinned: true,
    isMuted: true,
    avatars: ['https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', 'https://i.postimg.cc/cLC8YL5D/IMG-5074.jpg', 'https://i.postimg.cc/t4JVP4mz/IMG-7636.jpg', 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png'],
  },
  {
    id: '3',
    name: '바보',
    members: 0,
    lastMessage: '뭐해?',
    time: '오전 8:05',
    unread: 0,
    isPinned: false,
    isMuted: false,
    avatars: ['https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png'],
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
    avatars: ['https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png'],
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
    avatars: ['https://i.postimg.cc/wjMsJjbG/hadoseong.png'],
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
    avatars: ['https://i.postimg.cc/nhW91f6R/jangseon-u.png'],
    isBlocked: true,
  },
];

const MOCK_MESSAGES = {
  '1': [
    { id: 'm1', type: 'system', text: '2026년 4월 14일 화요일' },
    { id: 'm2', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '얘들아', time: '오후 12:32', isMe: false },
    { id: 'm3', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '그리고 형들', time: '오후 12:32', isMe: false },
    { id: 'm4', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '진짜...', time: '오후 12:32', isMe: false },
    { id: 'm5', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '중대발표 하나', time: '오후 12:32', isMe: false },
    { id: 'm6', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '먼데?', time: '오후 12:32', isMe: false },
    { id: 'm7', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '뭔데?', time: '오후 12:33', isMe: false },
    { id: 'm8', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '아 뭔데', time: '오후 12:34', isMe: false },
    { id: 'm9', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '말을 안 해', time: '오후 12:34', isMe: false },
    { id: 'm10', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '나 돈까스 먹음', time: '오후 12:40', isMe: false },
    { id: 'm11', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: 'ㅎㅎ', time: '오후 12:40', isMe: false },
    { id: 'm12', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '...', time: '오후 12:40', isMe: false },
    { id: 'm13', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '저기', time: '오후 12:40', isMe: false },
    { id: 'm14', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '얘들아?', time: '오후 12:40', isMe: false },
    { id: 'm15', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: '식탁에 올려둔 빵 내가 먹었어', time: '오후 12:45', isMe: false },
    { id: 'm16', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '...', time: '오후 12:46', isMe: false },
    { id: 'm17', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '그거 내 건데', time: '오후 12:46', isMe: false },
    { id: 'm18', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '진짜 짜증난다 미친팀', time: '오후 12:46', isMe: false },
    { id: 'm19', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: 'ㅗ', time: '오후 12:46', isMe: false },
    { id: 'm20', senderId: 'me', senderName: '나', avatar: '', text: '처맞을래?', time: '오후 12:46', isMe: true },
    { id: 'm20_1', senderId: 'me', senderName: '나', avatar: '', text: '형한테 싸가지없게', time: '오후 12:46', isMe: true },
    { id: 'm20_2', senderId: 'me', senderName: '나', avatar: '', text: 'ㅡㅡ', time: '오후 12:46', isMe: true },
    { id: 'm21', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '죄송합니다 형', time: '오후 12:46', isMe: false },
    { id: 'm22', type: 'system', text: '2026년 4월 15일 수요일' },
    { id: 'm23', senderId: 'me', senderName: '나', avatar: '', text: 'ㅆㅂ', time: '오전 08:01', isMe: true },
    { id: 'm24', senderId: 'me', senderName: '나', avatar: '', text: '아침뷰터', time: '오전 08:01', isMe: true },
    { id: 'm25', senderId: 'me', senderName: '나', avatar: '', text: '아침부터 좆같게', time: '오전 08:01', isMe: true },
    { id: 'm26', senderId: 'me', senderName: '나', avatar: '', text: '누가 닭 처우는소리 틀어놨냐씨ㅃㅇ', time: '오전 08:01', isMe: true },
    { id: 'm27', senderId: 'me', senderName: '나', avatar: '', text: '줘패기전에 나와라', time: '오전 08:01', isMe: true },
    { id: 'm28', senderId: 'me', senderName: '나', avatar: '', text: '걸리면 뒤질줄알아진짜니는', time: '오전 08:01', isMe: true },
    { id: 'm29', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: '그거 난데......', time: '오전 08:03', isMe: false },
    { id: 'm30', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', time: '오전 08:03', isMe: false },
    { id: 'm31', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㄹㅈㄷ', time: '오전 08:03', isMe: false },
    { id: 'm32', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ', time: '오전 08:03', isMe: false },
    { id: 'm33', senderId: 'me', senderName: '나', avatar: '', text: '봐줌', time: '오전 08:05', isMe: true },
  ],
  '2': [
    { id: 'm2_1', type: 'system', text: '2025년 11월 26일 수요일' },
    { id: 'm2_2', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '얘들아.. ^^ 항시.  노력하는.  모습.  아주 감동적이야.~~ 나는.  너희가.  잘.  됄. 꺼라고는. 생각했지만서도..', time: '오후 1:00', isMe: false },
    { id: 'm2_3', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '이정도. 성과가. 날지는. 몰랐내.~~ ㅎㅎㅎㅎ', time: '오후 1:00', isMe: false },
    { id: 'm2_4', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '항상. 고맙고. 이번앨범도~~. 파이팅해서!! 불태워보자~~~~', time: '오후 1:01', isMe: false },
    { id: 'm2_5', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '아자아자.ㅎㅎ', time: '오후 1:01', isMe: false },
    { id: 'm2_6', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '감사합니다, 대표님. 힘내서 열심히 해 보겠습니다!', time: '오후 1:05', isMe: false },
    { id: 'm2_7', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '항상 감사합니다 대표님!!!', time: '오후 1:06', isMe: false },
    { id: 'm2_8', senderId: 'me', senderName: '나', avatar: '', text: '대표님, 감사합니다. 앞으로도 노력하는 모습 보여드리겠습니다.', time: '오후 1:08', isMe: true },
    { id: 'm2_9', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '감사합니당', time: '오후 1:15', isMe: false },
    { id: 'm2_10', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '근데', time: '오후 1:15', isMe: false },
    { id: 'm2_11', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '정산 언제 해주세여???', time: '오후 1:15', isMe: false },
    { id: 'm2_12', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅠ', time: '오후 1:15', isMe: false },
    { id: 'm2_13', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '거지댐요', time: '오후 1:15', isMe: false },
    { id: 'm2_14', senderId: 'user21', senderName: 'BAPE 본부장님', avatar: 'https://i.postimg.cc/cLC8YL5D/IMG-5074.jpg', text: '선우야', time: '오후 1:16', isMe: false },
    { id: 'm2_15', senderId: 'user22', senderName: 'BAPE 매니저님', avatar: 'https://i.postimg.cc/t4JVP4mz/IMG-7636.jpg', text: '대표님, 죄송합니다.', time: '오후 1:17', isMe: false },
    { id: 'm2_16', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅇㅅㅇ', time: '오후 1:18', isMe: false },
    { id: 'm2_17', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '???', time: '오후 1:18', isMe: false },
    { id: 'm2_18', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '궁금하잔아여', time: '오후 1:18', isMe: false },
    { id: 'm2_19', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '담달.  10일~~~ ^^', time: '오후 1:25', isMe: false },
    { id: 'm2_20', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '선우야. 그런건. 개인톡으로나~', time: '오후 1:25', isMe: false },
    { id: 'm2_21', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '리더한테. 물어보며는. 좋을것같다. ㅎ', time: '오후 1:25', isMe: false },
    { id: 'm2_22', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '아직. 어려서. 그럴수있지~~..', time: '오후 1:25', isMe: false },
    { id: 'm2_23', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '넴', time: '오후 1:26', isMe: false },
    { id: 'm2_24', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: '대표님, 항상 저희를 위해서 힘써 주셔서 감사합니다. 선우한테는 제가 잘 이야기하겠습니다. 죄송합니다.', time: '오후 1:30', isMe: false },
    { id: 'm2_25', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '그려. 고생이. 많으네~~~ ㅎㅎ', time: '오후 1:35', isMe: false },
    { id: 'm2_26', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '앞으로도~~.. 많이.  고생하겠지만은.', time: '오후 1:35', isMe: false },
    { id: 'm2_27', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '고진감래의.  마음으로~ 버텨보자.  ^^', time: '오후 1:35', isMe: false },
    { id: 'm2_28', senderId: 'user20', senderName: 'BAPE 대표님', avatar: 'https://i.postimg.cc/W1zJr1f5/IMG-6325.jpg', text: '화이팅~~~~', time: '오후 1:35', isMe: false },
  ],
  '3': [
    { id: 'm3_1', type: 'system', text: '2026년 4월 10일 금요일' },
    { id: 'm3_2', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: '어디야?', time: '오후 2:00', isMe: false },
    { id: 'm3_3', senderId: 'me', senderName: '나', avatar: '', text: '나 지금 가는 중', time: '오후 2:05', isMe: true },
    { id: 'm3_4', type: 'system', text: '2026년 4월 11일 토요일' },
    { id: 'm3_5', senderId: 'me', senderName: '나', avatar: '', text: '지금 내 방 ㄱㄱ', time: '오후 11:30', isMe: true },
    { id: 'm3_6', type: 'system', text: '2026년 4월 12일 일요일' },
    { id: 'm3_7', senderId: 'me', senderName: '나', avatar: '', text: '패기전에 빨리 이리컴', time: '오후 4:20', isMe: true },
    { id: 'm3_8', type: 'system', text: '2026년 4월 13일 월요일' },
    { id: 'm3_9', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: '빨리 와', time: '오후 1:10', isMe: false },
    { id: 'm3_10', type: 'system', text: '2026년 4월 14일 화요일' },
    { id: 'm3_11', senderId: 'me', senderName: '나', avatar: '', text: 'ㅇㄷ?', time: '오전 10:00', isMe: true },
    { id: 'm3_12', senderId: 'user10', senderName: '바보', avatar: 'https://i.postimg.cc/4xyhtxFb/sae-peulojegteu-(4).png', text: 'ㅈㄱㅈ', time: '오전 10:02', isMe: false },
  ],
  '4': [
    { id: 'm4_1', type: 'system', text: '2026년 4월 10일 금요일' },
    { id: 'm4_2', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '형', time: '오후 5:00', isMe: false },
    { id: 'm4_3', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '진짜 안 가?ㅠ', time: '오후 5:00', isMe: false },
    { id: 'm4_4', senderId: 'me', senderName: '나', avatar: '', text: '안 감', time: '오후 5:05', isMe: true },
    { id: 'm4_5', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '리더형 가는디', time: '오후 5:06', isMe: false },
    { id: 'm4_6', senderId: 'me', senderName: '나', avatar: '', text: 'ㄱㄷ', time: '오후 5:06', isMe: true },
    { id: 'm4_7', type: 'system', text: '2026년 4월 12일 일요일' },
    { id: 'm4_8', senderId: 'me', senderName: '나', avatar: '', text: '처맞을래 욕처먹을래', time: '오후 8:00', isMe: true },
    { id: 'm4_9', senderId: 'me', senderName: '나', avatar: '', text: '골라라 둘 중에 하나', time: '오후 8:00', isMe: true },
    { id: 'm4_10', senderId: 'me', senderName: '나', avatar: '', text: '진심이다 형은', time: '오후 8:00', isMe: true },
    { id: 'm4_11', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '형', time: '오후 8:05', isMe: false },
    { id: 'm4_12', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '저 처맞겠습니다', time: '오후 8:05', isMe: false },
    { id: 'm4_13', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '죄송합니다', time: '오후 8:05', isMe: false },
    { id: 'm4_14', senderId: 'me', senderName: '나', avatar: '', text: 'ㅇㅇ', time: '오후 8:06', isMe: true },
    { id: 'm4_15', senderId: 'me', senderName: '나', avatar: '', text: '딱기달', time: '오후 8:06', isMe: true },
    { id: 'm4_16', type: 'system', text: '2026년 4월 14일 화요일' },
    { id: 'm4_17', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '나 머리 자름', time: '오후 3:00', isMe: false },
    { id: 'm4_18', type: 'system', text: '2026년 4월 15일 수요일' },
    { id: 'm4_19', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '형 그래도 읽는 성의는 좀 보여 줘', time: '오후 4:00', isMe: false },
    { id: 'm4_20', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '안 궁금했어도', time: '오후 4:00', isMe: false },
    { id: 'm4_21', senderId: 'me', senderName: '나', avatar: '', text: '좀 닥쳐봐씨발지금랭겜중인데병신아', time: '오후 4:10', isMe: true },
    { id: 'm4_22', senderId: 'me', senderName: '나', avatar: '', text: '안되겠다씨발 너 와바', time: '오후 4:10', isMe: true },
    { id: 'm4_23', senderId: 'me', senderName: '나', avatar: '', text: '3연패해서 기분 좆같은데 잘걸렸다 너', time: '오후 4:10', isMe: true },
    { id: 'm4_24', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '형님', time: '오후 4:12', isMe: false },
    { id: 'm4_25', senderId: 'user6', senderName: 'BAPE 김우현', avatar: 'https://i.postimg.cc/DwN4c3t6/gim-uhyeon.png', text: '저 지금 본가입니다 형님', time: '오후 4:12', isMe: false },
    { id: 'm4_26', senderId: 'me', senderName: '나', avatar: '', text: '안 물어봤으니까 ㄲㅈ라고 좀', time: '오후 4:15', isMe: true },
  ],
  '5': [
    { id: 'm5_1', type: 'system', text: '2025년 3월 31일 월요일' },
    { id: 'm5_2', senderId: 'me', senderName: '나', avatar: '', text: '도성아', time: '오후 8:35', isMe: true },
    { id: 'm5_3', senderId: 'me', senderName: '나', avatar: '', text: '야', time: '오후 8:35', isMe: true },
    { id: 'm5_4', senderId: 'me', senderName: '나', avatar: '', text: '야', time: '오후 8:35', isMe: true },
    { id: 'm5_5', senderId: 'me', senderName: '나', avatar: '', text: '야', time: '오후 8:35', isMe: true },
    { id: 'm5_6', senderId: 'me', senderName: '나', avatar: '', text: '야', time: '오후 8:35', isMe: true },
    { id: 'm5_7', senderId: 'me', senderName: '나', avatar: '', text: '야', time: '오후 8:35', isMe: true },
    { id: 'm5_8', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '왜 형', time: '오후 8:40', isMe: false },
    { id: 'm5_9', senderId: 'me', senderName: '나', avatar: '', text: '쟤 왜 저럼?', time: '오후 8:41', isMe: true },
    { id: 'm5_10', senderId: 'me', senderName: '나', avatar: '', text: '또 사고침?', time: '오후 8:41', isMe: true },
    { id: 'm5_11', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: 'ㅇㅇ', time: '오후 8:45', isMe: false },
    { id: 'm5_12', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '돈떨어졌대', time: '오후 8:45', isMe: false },
    { id: 'm5_13', senderId: 'me', senderName: '나', avatar: '', text: '아 ㅆㅂ 어쩐지 연락하더라', time: '오후 8:47', isMe: true },
    { id: 'm5_14', senderId: 'me', senderName: '나', avatar: '', text: '연락 한번도 안하던새끼가', time: '오후 8:47', isMe: true },
    { id: 'm5_15', senderId: 'me', senderName: '나', avatar: '', text: '와 좆같네 진짜', time: '오후 8:47', isMe: true },
    { id: 'm5_16', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '나한테 200 빌려가고 안 갚음', time: '오후 8:50', isMe: false },
    { id: 'm5_17', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '빌려주지 마', time: '오후 8:50', isMe: false },
    { id: 'm5_18', senderId: 'me', senderName: '나', avatar: '', text: '왜 빌려줌 그걸? 호구임?', time: '오후 8:51', isMe: true },
    { id: 'm5_19', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '걍 준다는 생각으로 ㅇㅇ', time: '오후 8:55', isMe: false },
    { id: 'm5_20', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '에휴', time: '오후 8:55', isMe: false },
    { id: 'm5_21', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '시발 진짜', time: '오후 8:55', isMe: false },
    { id: 'm5_22', senderId: 'me', senderName: '나', avatar: '', text: '나와라', time: '오후 9:00', isMe: true },
    { id: 'm5_23', senderId: 'me', senderName: '나', avatar: '', text: '닭갈비사줌', time: '오후 9:00', isMe: true },
    { id: 'm5_24', senderId: 'user11', senderName: 'BAPE 하도성', avatar: 'https://i.postimg.cc/wjMsJjbG/hadoseong.png', text: '예형님', time: '오후 9:01', isMe: false },
  ],
  '6': [
    { id: 'm6_1', type: 'system', text: '2025년 3월 31일 월요일' },
    { id: 'm6_2', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형', time: '오후 8:30', isMe: false },
    { id: 'm6_3', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형', time: '오후 8:30', isMe: false },
    { id: 'm6_4', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형 ㅠㅠㅠㅠㅠㅠ', time: '오후 8:30', isMe: false },
    { id: 'm6_5', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형 ㅠ 제발', time: '오후 8:30', isMe: false },
    { id: 'm6_6', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형 20마넌만 빌려주면안댐???', time: '오후 8:30', isMe: false },
    { id: 'm6_7', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅈㅂㅈㅂ', time: '오후 8:30', isMe: false },
    { id: 'm6_8', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅈㅂㅈㅂ', time: '오후 8:30', isMe: false },
    { id: 'm6_9', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅈㅂㅈㅂ', time: '오후 8:30', isMe: false },
    { id: 'm6_10', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅈㅂㅈㅂ', time: '오후 8:30', isMe: false },
    { id: 'm6_11', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅈㅂㅈㅂ', time: '오후 8:30', isMe: false },
    { id: 'm6_12', senderId: 'me', senderName: '나', avatar: '', text: '씨발년아 진짜 너 어디냐?', time: '오후 8:35', isMe: true },
    { id: 'm6_13', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '욕하지마 무서워..', time: '오후 8:36', isMe: false },
    { id: 'm6_14', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅜㅜ', time: '오후 8:36', isMe: false },
    { id: 'm6_15', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '형', time: '오후 8:36', isMe: false },
    { id: 'm6_16', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '나ㅣㄴ', time: '오후 8:36', isMe: false },
    { id: 'm6_17', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '진짜 갚을거야..................', time: '오후 8:36', isMe: false },
    { id: 'm6_18', senderId: 'me', senderName: '나', avatar: '', text: '니 도성이 돈도 안갚았대매 ㅄ아', time: '오후 8:40', isMe: true },
    { id: 'm6_19', senderId: 'me', senderName: '나', avatar: '', text: '왜그러고사냐 너는?', time: '오후 8:40', isMe: true },
    { id: 'm6_20', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '제발', time: '오후 8:42', isMe: false },
    { id: 'm6_21', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '20만', time: '오후 8:42', isMe: false },
    { id: 'm6_22', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '10일에갚을게.. ㅈㅂ', time: '오후 8:42', isMe: false },
    { id: 'm6_23', senderId: 'me', senderName: '나', avatar: '', text: '아가리좀', time: '오후 8:45', isMe: true },
    { id: 'm6_24', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아아아아', time: '오후 8:46', isMe: false },
    { id: 'm6_25', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아아아아', time: '오후 8:46', isMe: false },
    { id: 'm6_26', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아', time: '오후 8:46', isMe: false },
    { id: 'm6_27', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '앙', time: '오후 8:46', isMe: false },
    { id: 'm6_28', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅏㅇ', time: '오후 8:46', isMe: false },
    { id: 'm6_29', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: 'ㅏㅇㅇ', time: '오후 8:46', isMe: false },
    { id: 'm6_30', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아아', time: '오후 8:46', isMe: false },
    { id: 'm6_31', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아아앙', time: '오후 8:46', isMe: false },
    { id: 'm6_32', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '아', time: '오후 8:46', isMe: false },
    { id: 'm6_33', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '!!!!!!!!!!!!!!!!!', time: '오후 8:46', isMe: false },
    { id: 'm1', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '보이스톡', time: '오후 8:48', isMe: false, isCall: true },
    { id: 'm2', senderId: 'user12', senderName: '서누', avatar: 'https://i.postimg.cc/nhW91f6R/jangseon-u.png', text: '부재중', time: '오후 8:49', isMe: false, isCall: true },
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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{name: string, avatar: string, statusMessage?: string, backgroundImage?: string} | null>(null);
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // If we are scrolled up more than 50px from the bottom, show the button
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollButton(!isAtBottom);
  };

  useEffect(() => {
    if (activeChatId) {
      // Small delay to ensure DOM is ready before scrolling to bottom on initial load
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [messages, activeChatId]);

  return (
    <div className="flex h-[100dvh] w-full bg-gray-100 font-sans overflow-hidden justify-center items-center">
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
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProfile({
                        name: chat.name,
                        avatar: chat.avatars[0],
                        statusMessage: chat.name === '서누' ? '카톡 안 봄 연락 X' : undefined,
                        backgroundImage: chat.name === 'BAPE 대표님' ? 'https://i.postimg.cc/dV3TdVS4/IMG-7295.jpg' : undefined
                      });
                    }}
                  >
                    <AvatarGroup avatars={chat.avatars} isOfficial={chat.isOfficial} name={chat.name} />
                  </div>
                  
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
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-2 relative"
            >
              
              {/* Blocked User Warning */}
              {activeChat?.isBlocked && (
                <div className="sticky top-0 z-20 mb-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm flex divide-x divide-gray-200">
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-gray-700 font-medium">
                      <UserPlus className="w-5 h-5" />
                      <span>추가</span>
                    </button>
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-gray-700 font-medium">
                      <Ban className="w-5 h-5" />
                      <span>차단해제</span>
                    </button>
                    <button className="flex-1 py-3 flex items-center justify-center space-x-1 text-red-500 font-medium">
                      <AlertTriangle className="w-5 h-5" />
                      <span>신고</span>
                    </button>
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
                          <img 
                            src={msg.avatar} 
                            alt="avatar" 
                            className="w-10 h-10 rounded-[16px] object-cover cursor-pointer" 
                            onClick={() => setSelectedProfile({ 
                              name: msg.senderName, 
                              avatar: msg.avatar,
                              statusMessage: msg.senderName === '서누' ? '카톡 안 봄 연락 X' : undefined,
                              backgroundImage: msg.senderName === 'BAPE 대표님' ? 'https://i.postimg.cc/dV3TdVS4/IMG-7295.jpg' : undefined
                            })}
                          />
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

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-20 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10 transition-opacity"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            )}

            {/* Input Area */}
            {activeChat?.isBlocked ? (
              <div className="bg-white px-4 py-5 flex justify-center items-center shrink-0 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-black text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">!</div>
                  <span>차단 친구와는 대화할 수 없습니다.</span>
                </div>
              </div>
            ) : (
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
            )}

          </div>
        )}

        {/* Profile Overlay */}
        {selectedProfile && (
          <div className="absolute inset-0 z-50 flex flex-col text-white animate-in fade-in duration-200">
            {/* Background Image or Color */}
            {selectedProfile.backgroundImage ? (
              <div 
                className="absolute inset-0 bg-cover bg-center z-[-1]" 
                style={{ backgroundImage: `url(${selectedProfile.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-[#848b91] z-[-1]"></div>
            )}

            {/* Top Bar */}
            <div className="flex justify-end p-4">
              <button onClick={() => setSelectedProfile(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex-1 flex flex-col items-center justify-end pb-12">
              <img 
                src={selectedProfile.avatar} 
                alt="profile" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-[36px] object-cover bg-black mb-4 shadow-lg cursor-pointer" 
                onClick={() => setIsFullScreenImage(true)}
              />
              <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
              {selectedProfile.statusMessage && (
                <p className="text-sm text-white/80 mt-2">{selectedProfile.statusMessage}</p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="h-24 border-t border-white/20 flex justify-center items-center space-x-16 pb-2">
              <button className="flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity">
                <MessageCircle className="w-6 h-6" fill="currentColor" />
                <span className="text-xs font-medium">1:1채팅</span>
              </button>
              <button className="flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity">
                <Phone className="w-6 h-6" fill="currentColor" />
                <span className="text-xs font-medium">통화하기</span>
              </button>
            </div>
          </div>
        )}

        {/* Full Screen Image Overlay */}
        {isFullScreenImage && selectedProfile && (
          <div className="absolute inset-0 z-[60] flex flex-col bg-black text-white animate-in fade-in duration-200">
            {/* Top Bar */}
            <div className="flex justify-end p-4">
              <button onClick={() => setIsFullScreenImage(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Full Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <img 
                src={selectedProfile.avatar} 
                alt="full profile" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
