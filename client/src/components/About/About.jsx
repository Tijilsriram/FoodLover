import "./About.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

import chefs from "../../assets/data/chef";

function About() {
  return (
    <section id="about">
      <div className="container">

        <h3 className="normal_heading-1">
          Chef Team
        </h3>

        <h2 className="main_heading">
          BEST CHEFS FOR YOU
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
          {chefs.map((chef) => (
            <SwiperSlide key={chef.id}>

              <div className="chef_cards">

                <img src={chef.img} alt={chef.name} />

                <div className="chef_content">

                  <h2>{chef.name}</h2>

                  <p className="position">
                    {chef.role}
                  </p>

                  <div className="social_icons">

                    <a
                      href={chef.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebook size={30} />
                    </a>

                    <a
                      href={chef.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram size={30} />
                    </a>

                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default About;