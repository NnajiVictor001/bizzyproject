/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Box from '@mui/material/Box';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, EffectCoverflow, Navigation } from 'swiper';
import styles from './Carousel.module.scss';

export default function Carousel(props) {
  const { images } = props;
  const { prev, next } = styles;
  const swiperRef = useRef();

  return (
    <Box>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect="coverflow"
        slidesPerView={3}
        centeredSlides
        spaceBetween={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={{
          type: 'fraction'
        }}
        navigation={false}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
        style={{ color: 'black', paddingTop: '1rem', paddingBottom: '3.5rem' }}>
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.src}
              alt={`carousel ${img.id}`}
              style={{
                boxShadow: '0px 0px 8px 1px rgba(0,0,0,0.33)',
                width: '32.3rem',
                height: 'auto'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <div className={prev} onClick={() => swiperRef.current?.slidePrev()}>
          &#60;
        </div>
        <div className={next} onClick={() => swiperRef.current?.slideNext()}>
          &#62;
        </div>
      </div>
    </Box>
  );
}
