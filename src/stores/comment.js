import pb from '@/api/pb';
import { create } from 'zustand';

const INITAIL_COMMENTDATA = {
  comment: '',
  writer: '',
  feed: '',
};

export const useCommentData = create((set) => ({
  commentList: [],

  commentData: INITAIL_COMMENTDATA,

  updateCommentData: (data) =>
    set(({ commentData }) => ({ commentData: { ...commentData, ...data } })),

  resetCommentData: () => set({ commentData: INITAIL_COMMENTDATA }),

  fetchCommentData: async (feedId) => {
    const results = await pb.collection('comments').getList(1, 50, {
      filter: `feed = "${feedId}"`,
      expand: 'writer, feed',
    });

    set({ commentList: results.items });
  },

  fetchCommentsData: async () => {
    const results = await pb.collection('comments').getList(1, 50, {
      expand: 'writer, feed',
    });

    set({ commentList: results.items });
  },
}));
