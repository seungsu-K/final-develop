import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import getPbImageURL from '@/api/getPbImageURL';

export const useUsers = create((set) => ({
  users: [],

  updateUsers: (data) => set(({ users }) => ({ users: { ...users, ...data } })),

  fetchUsers: async (filter) => {
    if (!filter) return;

    const results = await pb.collection('users').getList(1, 50, {
      filter: filter,
    });

    set({ users: results.items });
  },
}));

// 유저 정보
const INITIAL_USERDATA = {
  email: '',
  nickname: '',
  avatar: '',
  avatarUrl: '',
  interest: [],
  introduction: '',
};

export const useUserProfile = create((set) => ({
  userData: INITIAL_USERDATA,
  isLoading: false,
  error: null,
  tempAvatar: null,

  fetchUserProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const record = await pb.collection('users').getOne(userId);
      const avatarUrl =
        record.avatar === '' ? '/profile.png' : getPbImageURL(record, 'avatar');
      set({ userData: { ...record, avatarUrl }, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      set({ error: 'Failed to fetch user profile', isLoading: false });
      toast.error(
        '유저 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  },

  updateProfile: async (userId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedRecord = await pb.collection('users').update(userId, data);
      const avatarUrl =
        getPbImageURL(updatedRecord, 'avatar') || '/profile.png';
      set({ userData: { ...updatedRecord, avatarUrl }, isLoading: false });
    } catch (error) {
      console.error('Failed to update profile:', error);
      set({ error: 'Failed to update profile', isLoading: false });
      toast.error('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw error;
    }
  },

  updateField: async (userId, field, value) => {
    set({ isLoading: true, error: null });
    try {
      const updatedRecord = await pb
        .collection('users')
        .update(userId, { [field]: value });
      set((state) => ({
        userData: { ...state.userData, [field]: value },
        isLoading: false,
      }));
      return updatedRecord;
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      set({ error: `Failed to update ${field}`, isLoading: false });
      toast.error('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw error;
    }
  },

  setTempAvatar: (file) => set({ tempAvatar: file }),

  updateAvatar: async (userId, avatarFile) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      const updatedRecord = await pb
        .collection('users')
        .update(userId, formData);
      const avatarUrl = getPbImageURL(updatedRecord, 'avatar');
      set((state) => ({
        userData: { ...state.userData, avatarUrl },
        isLoading: false,
        tempAvatar: null,
      }));
      return avatarUrl;
    } catch (error) {
      console.error('Failed to update avatar:', error);
      set({ error: 'Failed to update avatar', isLoading: false });
      toast.error(
        '프로필 이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
      throw error;
    }
  },

  setNickname: (nickname) =>
    set((state) => ({ userData: { ...state.userData, nickname } })),
  setIntroduction: (introduction) =>
    set((state) => ({ userData: { ...state.userData, introduction } })),
  setTempInterest: (interests) => set({ tempInterest: interests }),
  resetTempInterest: () => set({ tempInterest: null }),

  resetUserData: () =>
    set({ userData: INITIAL_USERDATA, isLoading: false, error: null }),
}));

export const updateNickname = (userId, nickname) =>
  useUserProfile.getState().updateField(userId, 'nickname', nickname);
export const updateInterest = (userId, interests) =>
  useUserProfile.getState().updateField(userId, 'interest', interests);
export const updateIntroduction = (userId, introduction) =>
  useUserProfile.getState().updateField(userId, 'introduction', introduction);
