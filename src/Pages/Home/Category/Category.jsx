import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";

const Category = () => {
  return (
    <section className="mb-24">
      <SectionHeader heading="ORDER ONLINE" subHeading="From 11:00am to 10:00pm" />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h4 className="text-3xl text-center text-white -mt-14 uppercase">
            Salads
          </h4>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h4 className="text-3xl text-center text-white -mt-14 uppercase">
            pizzas
          </h4>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h4 className="text-3xl text-center text-white -mt-14 uppercase">
            Soups
          </h4>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h4 className="text-3xl text-center text-white -mt-14 uppercase">
            desserts
          </h4>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h4 className="text-3xl text-center text-white -mt-14 uppercase">
            Salads
          </h4>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
