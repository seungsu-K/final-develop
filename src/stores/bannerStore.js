import { create } from 'zustand';
import { getRecords } from '@/api/getRecords';
import getPbImageURL from '@/api/getPbImageURL';

export const useBannerStore = create((set) => ({
  images: [],
  swiperIndex: 0,
  swiper: null,
  fetchImages: async () => {
    const banners = await getRecords('banners');
    const bannerData = banners.map((banner) => ({
      id: banner.id,
      title: banner.title,
      url: banner.url,
      image: getPbImageURL(banner, 'image'),
    }));
    set({ images: bannerData });
  },
  setSwiperIndex: (index) => set({ swiperIndex: index }),
  setSwiper: (swiper) => set({ swiper }),
}));
