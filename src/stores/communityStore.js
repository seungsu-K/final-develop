import { create } from 'zustand';
import pb from '@/api/pb';

const communityStore = create((set, get) => ({
  feeds: [],
  isLoading: false,
  error: null,
  filter: {
    category: '추천',
  },
  setFilter: (newFilter) =>
    set((state) => ({ filter: { ...state.filter, ...newFilter } })),
  fetchFeeds: async () => {
    const { filter } = get();
    set({ isLoading: true, error: null });
    try {
      let sortField = '';

      if (filter.category === '추천') {
        sortField = '';
      } else if (filter.category === '신규') {
        sortField = '-created';
      }

      const records = await pb.collection('feeds').getList(1, 50, {
        sort: sortField,
        expand: 'writer',
      });

      const formattedFeeds = records.items.map((feed) => ({
        ...feed,
        created: feed.created ? new Date(feed.created).toISOString() : null,
        image: feed.image ? pb.getFileUrl(feed, feed.image) : null,
      }));

      set({ feeds: formattedFeeds, isLoading: false });
    } catch (error) {
      console.error('Error fetching feeds:', error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default communityStore;
