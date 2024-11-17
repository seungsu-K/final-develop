import pb from '@/api/pb';
import { create } from 'zustand';

export const useMessageData = create((set) => ({
  chatData: {},
  userData: [],

  message: '',
  messages: [],

  chatList: [],

  updateMessage: (data) => set(() => ({ message: data })),
  resetMessage: () => set(() => ({ message: '' })),

  updateMessages: (data) =>
    set(({ messages }) => ({ messages: [...messages, data] })),

  fetchChatData: async (postId) => {
    const results = await pb.collection('messages').getList(1, 50, {
      filter: `post_id = "${postId}"`,
      expand: 'post_id, user_id',
      sort: 'created',
    });

    set({
      chatData: results.items[0],
      messages: results.items[0]?.messages ? results.items[0].messages : [],
    });
  },

  fetchChatRealTime: (data) => set(() => ({ chatData: data })),

  fetchChatDataByFilter: async (filter) => {
    if (!filter) return;

    const results = await pb.collection('messages').getList(1, 50, {
      filter: filter,
      expand: 'post_id, user_id',
    });

    set({ chatList: results.items });
  },
}));
