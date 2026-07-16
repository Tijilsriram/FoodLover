import "./Blog.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import events from "../../assets/data/events";

function Blog() {
  return (
    <section id="blog">
      <div className="container">

        <h3 className="normal_heading-1">
          Month of August
        </h3>

        <h2 className="main_heading">
          UPCOMING RECIPES
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            968: {
              slidesPerView: 3,
            },
          }}
        >
          {events.map((item) => (
            <SwiperSlide key={item.id}>

              <div className="events_card">

                <img src={item.img} alt="" />

                <div className="event_content">

                  <p>{item.text}</p>

                  <a href="#">
                    Read More
                  </a>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Blog;