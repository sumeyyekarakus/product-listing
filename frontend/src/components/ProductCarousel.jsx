// src/components/ProductCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";        // ✅ DOĞRU (v11)
import "swiper/css";
import "swiper/css/navigation";

export default function ProductCarousel({ images }) {
  const list = Array.isArray(images) ? images : Object.values(images || {});
  return (
    <Swiper modules={[Navigation]} navigation spaceBetween={8} slidesPerView={1}>
      {list.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} style={{ width: "100%", height: "auto" }} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
