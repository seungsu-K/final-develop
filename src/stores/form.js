import { create } from 'zustand';
import pb from '@/api/pb';

export const useCheckedInterest = create((set) => ({
  checkedInterest: '',
  setCheckedInterest: (value) => set({ checkedInterest: value }),
  count: 0,
  IncreaseCount: (value) =>
    set((state) => ({ count: state.count + 1 + value })),
}));

const INITIAL_POSTDATA = {
  title: '',
  description: '',
  category: '',
  memberCount: '1',
  date: '',
  time: '',
  location: '',
  writer: '',
  image: [],
};

export const usePostData = create((set) => ({
  postData: INITIAL_POSTDATA,
  imageData: [],
  isLoading: false,

  updatePostData: (data) =>
    set(({ postData }) => ({ postData: { ...postData, ...data } })),

  fetchPost: async (postId) => {
    set({ isLoading: true });
    const post = await pb.collection('appointments').getOne(`${postId}`);

    set({ postData: post, isLoading: false });
  },

  resetPostData: () => set({ postData: INITIAL_POSTDATA }),

  updateImageData: (data) => set(() => ({ imageData: data })),

  resetImageData: () => set({ imageData: [] }),
}));

const INITAIL_FEEDDATA = {
  content: '',
  writer: '',
};

export const useFeedData = create((set) => ({
  feedData: INITAIL_FEEDDATA,
  imageData: [],

  updateFeedData: (data) =>
    set(({ feedData }) => ({ feedData: { ...feedData, ...data } })),

  resetFeedData: () => set({ feedData: INITAIL_FEEDDATA }),

  updateImageData: (data) => set(() => ({ imageData: data })),

  resetImageData: () => set({ imageData: [] }),
}));
