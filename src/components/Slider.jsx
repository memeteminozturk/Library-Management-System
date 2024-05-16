import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



const Slider = () => {

  const slides = [];

  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https:/loremflickr.com/4000/2000/book?random=${i}`}
          alt={`Slider Img-${i+1}`}
        />
      </SwiperSlide>
    );
  }

  return (
    <section className="home-slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        // navigation={true}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev1",
          nextEl: ".swiper-button-next1",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      >
        {slides}
        <div className="swiper-button-prev1">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="swiper-button-next1">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>

      </Swiper>
    </section>
  )
}

export default Slider