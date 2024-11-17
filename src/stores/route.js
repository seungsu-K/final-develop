import { create } from 'zustand';

export const useNavList = create(() => ({
  navList: [
    {
      path: '/main/home',
      text: '홈',
      icon: 'home',
      iconFull: 'homeFull',
    },
    {
      path: '/main/myAppointment',
      text: '내 모임',
      icon: 'calendar',
      iconFull: 'calendarFull',
    },
    {
      path: '/main/community',
      text: '커뮤니티',
      icon: 'people',
      iconFull: 'peopleFull',
    },
    {
      path: '/main/profile',
      text: '프로필',
      icon: 'person',
      iconFull: 'personFull',
    },
  ],
}));

export const useHeader = create(() => ({
  header: [
    {
      path: '/main/home',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/home/new',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/home/recommend',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/home/interest',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/myAppointment',
      text: '내 모임',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/community',
      text: '커뮤니티',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/community/new',
      text: '커뮤니티',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/community/recommend',
      text: '커뮤니티',
      iconList: [
        { iconId: 'search', path: '/main/search', title: '검색' },
        { iconId: 'chat', path: '/main/chatlist', title: '채팅' },
        { iconId: 'alarm', path: '/main/alarm', title: '알림' },
      ],
    },
    {
      path: '/main/profile/appointment',
      text: '프로필',
      iconList: [
        { iconId: 'setting', path: '/main/profile/setting', title: '설정' },
      ],
    },
    {
      path: '/main/profile/feed',
      text: '프로필',
      iconList: [
        { iconId: 'setting', path: '/main/profile/setting', title: '설정' },
      ],
    },
  ],
}));

export const useProfileNav = create(() => ({
  profileNav: [
    { path: '/main/profile/appointment', text: '모임', end: true },
    { path: '/main/profile/feed', text: '게시글' },
  ],
}));
