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
        <SwiperSlide>
          <img src="https://i.pinimg.com/originals/42/5a/fe/425afe2a2b16375f86edcebfbb42ef6c.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://wallpapercave.com/wp/wp12420099.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images7.alphacoders.com/133/1338193.png" alt="" />
        </SwiperSlide>
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