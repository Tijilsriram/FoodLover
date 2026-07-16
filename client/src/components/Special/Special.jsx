import "./Special.css";
import pulao from "../../assets/images/pulao.jpg";
import ptikka from "../../assets/images/ptikka.jpg";
import fsalad from "../../assets/images/fsalad.jpg";
import food from "../../assets/images/food.jpg";
function Special(){
    return (  <aside id="sp-offer">
        <div className="container">
            <div className="sp-content">
                <div className="left_side_content">
                    <div className="headings">
                        <h3>From The Menu</h3>
                        <h2>SPECIAL OFFERS</h2>
                    </div>
                    <div className="imgs_content">
                        <div className="imgs">
                            <img src={pulao} alt="" width="65px" height="60px"/>
                            <div className="content_for_img">
                                <h4>Raju Gari Kodi Pulao</h4>
                                <p>Raju Gari Kodi Pulao is a spicy, aromatic Andhra-style chicken rice dish cooked with ghee, herbs, and flavorful masala.</p>
                            </div>
                        </div>
                        <div className="price">
                            <p>₹220</p>
                        </div>
                    </div>
                    <div className="imgs_content">
                        <div className="imgs">
                            <img src={ptikka} alt="" width="60px" height="60px"/>
                            <div className="content_for_img">
                                <h4>Paneer Tikka Biryani</h4>
                                <p>Paneer Tikka Biryani blends spicy grilled paneer with fragrant rice and spices, creating a delicious, smoky, and satisfying vegetarian meal.</p>
                            </div>
                        </div>
                        <div className="price">
                            <p>₹200</p>
                        </div>
                    </div>
                    <div className="imgs_content">
                        <div className="imgs">
                            <img src={fsalad} alt="" width="60px" height="60px"/>
                            <div className="content_for_img">
                                <h4>Fruit Salad with ice-cream</h4>
                                <p>Fruit salad with ice cream is a refreshing dessert combining fresh fruits and creamy ice cream for a sweet, juicy, and chilled treat.</p>
                            </div>
                        </div>
                        <div className="price">
                            <p>₹150</p>
                        </div>
                    </div>
                </div>
                <div className="right_side_content">
                    <div className="img_right_side">
                        <img src={food} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </aside>
);
}
export default Special;