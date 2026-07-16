
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import thali from "../../assets/images/thali.jpg";
import keema from "../../assets/images/keema.jpeg";
import delight from "../../assets/images/delight.jpg";
import "./Deal.css";
const dishes = [
  {
    id: 1,
    img: thali,
    title: "Veg Thali",
    desc: "A veg thali is a wholesome Indian platter with rice, roti, dal, curry, vegetables, pickle, curd, and dessert.",
    price: "Only ₹200",
  },
  {
    id: 2,
    img: keema,
    title: "Mutton Keema Biryani",
    desc: "Mutton keema biryani is a flavorful dish made with spiced minced meat, basmati rice, herbs, and aromatic Indian spices.",
    price: "Only ₹300",
  },
  {
    id: 3,
    img: delight,
    title: "Apricot Delight",
    desc: "Apricot delight is a sweet dessert made with dried apricots, cream, sugar, and nuts.",
    price: "Only ₹250",
  },
];
function Deal(){
    return ( <section id="deal-today">
        <div className="container">
            <h3 className="normal_heading-1">Deal Today</h3>
            <h2 className="main_heading">TODAY SPECIAL DISH</h2>
             <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
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
          {dishes.map((dish) => (
            <SwiperSlide key={dish.id}>
              <div className="cards">
                <img src={dish.img} alt={dish.title} />

                <h4>{dish.title}</h4>

                <p>{dish.desc}</p>

                <p className="price">{dish.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
            
        </div>
    </section>);
}
export default Deal;