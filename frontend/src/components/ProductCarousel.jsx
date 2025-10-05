
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

export default function ProductsCarousel({ items=[] }) {
  return (
    <div className="products-swiper">
      <button className="nav-btn nav-prev" aria-label="Previous">‹</button>
      <button className="nav-btn nav-next" aria-label="Next">›</button>

      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation={{ prevEl: '.nav-prev', nextEl: '.nav-next' }}
        scrollbar={{ draggable: true, hide: false }}
        loop={false}
        centeredSlides={false}
        slidesPerView={4}
        slidesPerGroup={1}
        spaceBetween={20}                    
        breakpoints={{
          0:    { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
          640:  { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 24 },
          900:  { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 32 },
          1200: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 44 },
        }}
      >
        {items.map(p => (
          <SwiperSlide key={p.id}>
            <ProductCard p={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
