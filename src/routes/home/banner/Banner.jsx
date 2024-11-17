import S from '@/routes/home/banner/Banner.module.css';
import { useEffect, useCallback, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import IconButton from '@/components/Button/IconButton';
import { useBannerStore } from '@/stores/bannerStore';
import { number } from 'prop-types';

const SwiperPagination = memo(({ index, total }) => (
  <div className={S.pagination__text}>
    <span>{index + 1}</span>
    <span>/</span>
    <span>{total}</span>
  </div>
));

SwiperPagination.propTypes = {
  index: number,
  total: number,
};

SwiperPagination.displayName = 'SwiperPagination';

function Banner() {
  const {
    images,
    swiperIndex,
    swiper,
    fetchImages,
    setSwiperIndex,
    setSwiper,
  } = useBannerStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  return (
    <section className={S.component}>
      <Swiper
        className={S.Swiper}
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
          reverseDirection: false,
        }}
        loop={images.length > 1}
        watchSlidesProgress={true}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSwiper={setSwiper}
      >
        {images.map((banner) => (
          <SwiperSlide key={banner.id}>
            <a href={banner.url} target="_blank" rel="noopener noreferrer">
              <img src={banner.image} alt={banner.title} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${S.pagination} label-sm`}>
        <SwiperPagination index={swiperIndex} total={images.length} />
        <IconButton
          title="next"
          iconId="plus"
          width={13}
          height={13}
          iconColor="var(--white)"
          onClick={handleNext}
        />
      </div>
    </section>
  );
}

export default Banner;
