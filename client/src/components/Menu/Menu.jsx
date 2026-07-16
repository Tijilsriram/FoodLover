import { useState } from "react";
import "./Menu.css";
import menu from "../../assets/data/menu";

function Menu(){
    const [items, setItems] = useState(menu);
    const [active, setActive] = useState("all");

    const filterItems = (category) => {
    setActive(category);

    if (category === "all") {
      setItems(menu);
      return;
    }

    const filtered = menu.filter(
      (item) => item.category === category
    );

    setItems(filtered);
  };
    return  (<section id="menu">
        <div className="container">
            <h3 className="normal_heading-1">Food Lovers</h3>
            <h2 className="main_heading">RESTAURANT MENU</h2>
            <div className="food_lover_container">
                <div className="btn-container">
                    <button
              className={`btn-cat ${active === "all" ? "active_btn" : ""}`}
              onClick={() => filterItems("all")}
            >
              All Dishes
            </button>

            <button
              className={`btn-cat ${active === "Appetizers" ? "active_btn" : ""}`}
              onClick={() => filterItems("Appetizers")}
            >
              Appetizers
            </button>

            <button
              className={`btn-cat ${active === "Main Course" ? "active_btn" : ""}`}
              onClick={() => filterItems("Main Course")}
            >
              Main Course
            </button>

            <button
              className={`btn-cat ${active === "Desserts" ? "active_btn" : ""}`}
              onClick={() => filterItems("Desserts")}
            >
              Desserts
            </button>
                </div>
                <div className="menu_items_container">
                                {items.map((item) => (

              <div className="img_cards" key={item.id}>

                <img src={item.img} alt={item.title} />

                <p className="price">
                  Only ₹{item.price}
                </p>

                <p>{item.title}</p>

              </div>

            ))}
                </div>
            </div>
        </div>
    </section>);
}
export default Menu;