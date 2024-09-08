import SectionHeader from "../../../Componets/SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import quote from "../../../assets/home/quote.png"

const Testimonials = () => {
  const [ reviews, setReviews ] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [])

  return (
    <section className="mb-32">
      {/* this section header takes 3 props (subHeading, heading and className) */}
      <SectionHeader subHeading="What Our Clients Say" heading="TESTIMONIALS" />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Navigation]} // if need pagination then add pagination in modules
        className="mySwiper"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center px-4 md:px-28">
              <Rating
                className="mb-14"
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <img className="mb-12" src={quote} alt="quote" />
              <p className="mb-2">{review.details}</p>
              <h3 className="text-3xl font-medium text-[#CD9003]">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;