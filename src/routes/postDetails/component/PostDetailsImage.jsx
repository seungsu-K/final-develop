import { getPostImageURL } from '@/api/getPbImageURL';
import S from '@/routes/home/banner/Banner.module.css';
import { getRecord } from '@/api/getRecords';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import IconButton from '@/components/Button/IconButton';
import { useParams } from 'react-router-dom';

function PostDetailImage() {
  const [images, setImages] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState();

  const handleNext = () => {
    swiper?.slideNext();
  };

  const { postId } = useParams();

  useEffect(() => {
    const filter = `id = "${postId}"`;

    const fetchImages = async () => {
      const record = await getRecord('appointments', filter);
      const post = record.items[0];
      const imageUrls = post.image.map((fileName) =>
        getPostImageURL(post, fileName)
      );
      setImages(imageUrls);
    };

    fetchImages();
  }, [postId]);

  return (
    <section className={S.component}>
      <Swiper
        className={S.Swiper}
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={0}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSwiper={(e) => {
          setSwiper(e);
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt={''} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${S.pagination} label-sm`}>
        <div className={S.pagination__text}>
          <span>{swiperIndex + 1}</span>
          <span>/</span>
          <span>{images.length}</span>
        </div>

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

export default PostDetailImage;
