import pb from '@/api/pb';
import { create } from 'zustand';

export const useJoin = create((set) => ({
  joinData: [],

  updateJoinData: (data) =>
    set(({ joinData }) => ({ joinData: [...joinData, data] })),

  fetchJoinData: async (postId) => {
    const results = await pb.collection('join').getList(1, 50, {
      filter: `appointment_id = "${postId}"`,
    });

    set({ joinData: results.items });
  },

  fetchJoinDataByUser: async (userId) => {
    const results = await pb.collection('join').getList(1, 50, {
      filter: `user_id = "${userId}"`,
      expand: 'appointment_id, user_id',
    });

    set({ joinData: results.items });
  },

  resetJoinData: () => set({ postData: [] }),
}));
