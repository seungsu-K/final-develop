import { create } from 'zustand';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

export const useKebabMenuStore = create((set, get) => ({
  isOptionOpen: false,
  currentUser: null,
  postWriter: null,
  showConfirm: false,
  confirmAction: '',
  confirmText: '',

  setIsOptionOpen: (isOpen) => set({ isOptionOpen: isOpen }),
  setShowConfirm: (show) => set({ showConfirm: show }),
  setConfirmAction: (action) => set({ confirmAction: action }),
  setConfirmText: (text) => set({ confirmText: text }),
  setPostWriter: (writer) => set({ postWriter: writer }),

  fetchUser: async () => {
    const user = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;
    set({ currentUser: user });
  },

  fetchPostWriter: async (category, postId) => {
    if (get().currentUser) {
      const post = await pb.collection(category).getOne(postId);
      set({ postWriter: post.writer });
    }
  },

  handleOpenMenu: () => set((state) => ({ isOptionOpen: !state.isOptionOpen })),
  handleCloseMenu: () => set({ isOptionOpen: false }),

  handleDeleteClick: (categoryText) => {
    set({
      confirmText: `이 ${categoryText}을 삭제하시겠습니까?`,
      confirmAction: 'delete',
      showConfirm: true,
      isOptionOpen: false,
    });
  },

  handleReportClick: (categoryText) => {
    set({
      confirmText: `이 ${categoryText}을 신고하시겠습니까?`,
      confirmAction: 'report',
      showConfirm: true,
      isOptionOpen: false,
    });
  },

  handleLeaveChatClick: (isAuthor) => {
    const action = isAuthor ? 'deletePost' : 'leaveChat';
    const text = isAuthor
      ? '현재 모임을 삭제하시겠습니까?'
      : '정말로 모임을 탈퇴하시겠습니까?';
    set({
      confirmText: text,
      confirmAction: action,
      showConfirm: true,
      isOptionOpen: false,
    });
  },

  handleConfirm: async (category, postId, feedId, nav, isAuthor) => {
    const { confirmAction } = get();
    if (
      confirmAction === 'delete' ||
      (confirmAction === 'deletePost' && isAuthor)
    ) {
      if (category === 'appointmets') {
        try {
          await pb.collection('appointmets').delete(postId);
          nav('/main', { replace: true });
          toast.success(`모임이 삭제되었습니다.`);
        } catch {
          toast.error(
            `모임 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`
          );
        }
      } else if (category === 'feeds') {
        try {
          await pb.collection('feeds').delete(feedId);
          nav('/main/community', { replace: true });
          toast.success(`게시물이 삭제되었습니다.`);
        } catch {
          toast.error(
            `게시물 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`
          );
        }
      }
    } else if (confirmAction === 'report') {
      try {
        await pb.collection('reports').create({
          post: postId,
          reporter: pb.authStore.model.email,
          reason: '사용자 신고',
          category: category,
        });
        toast.success('신고가 접수되었습니다.');
      } catch {
        toast.error(
          '신고 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    } else if (confirmAction === 'leaveChat' && !isAuthor) {
      // 모임 탈퇴 기능 추가하기! 일단 홈으로 이동함!!
      nav('/main', { replace: true });
      toast.success('모임에서 성공적으로 탈퇴하셨습니다.');
    }
    set({ showConfirm: false });
  },

  handleCancel: () => set({ showConfirm: false }),
}));
