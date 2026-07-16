import "./Feedback.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import cruise from "../../assets/images/cruise.jpg";
import raja from "../../assets/images/raja.jpg";
import rgv from "../../assets/images/rgv.jpg";
import "../../styles/responsive.css";
const reviews = [
  {
    id: 1,
    img: cruise,
    name: "Tom Cruise",
    review:
      "This restaurant offers a wonderful dining experience with delicious food, warm ambiance, and courteous staff. Every dish was perfectly cooked, leaving us fully satisfied and eager to return again soon.",
  },
  {
    id: 2,
    img: raja,
    name: "S. S. Rajamouli",
    review:
      "The restaurant delivers an exceptional experience with flavorful food, elegant ambiance, and friendly service. Each dish is thoughtfully prepared, making it an ideal spot for both casual meals and special occasions.",
  },
  {
    id: 3,
    img: rgv,
    name: "Ram Gopal Varma",
    review:
      "The restaurant offers delicious cuisine, excellent service, and a cozy ambiance. Every dish was flavorful, and the staff made the experience truly enjoyable and memorable.",
  },
];
function Feedback(){
    return ( <section id="customer_feedback">
        <div className="container swiper mySwiper">
            <h3 className="normal_heading-1">Food Lovers</h3>
            <h2 className="main_heading">CUSTOMER FEEDBACK</h2>
             <Swiper
          modules={[Pagination]}
          loop
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            968: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="customer_card">

                <img
                  src={review.img}
                  alt={review.name}
                  width="80"
                  height="80"
                />

                <p>{review.review}</p>

                <p className="name">
                  {review.name}
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
            
        </div>
    </section>);
}
export default Feedback;