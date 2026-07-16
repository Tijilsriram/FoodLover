import "./Footer.css";
import logo from "../../assets/images/logo1.png";

function Footer() {
  return (
    <>
      <section id="contact">
        <div className="container">

          <div className="footer_container">

            <div className="about_us">

              <h2>
                <img src={logo} alt="Food Lovers" />
              </h2>

              <p>
                Our restaurant offers a perfect blend of delicious cuisine,
                cozy ambiance, and exceptional service.
              </p>

              <a href="#">Read More</a>

            </div>

            <div className="opening_hours">

              <h2>Opening Hours</h2>

              <p className="day">
                SUNDAY:
                <span> --------10:00 AM - 12:00 AM</span>
              </p>

              <p className="day">
                MON-SAT:
                <span> --------10:00 AM - 10:00 PM</span>
              </p>

            </div>

            <div className="contact_us">

              <h2>Contact Us</h2>

              <h3>GET IN TOUCH</h3>

              <p>+91-9989266824</p>

              <p className="add">Address</p>

              <p>
                Near Kotha Bus Stand,
                Eluru,
                West Godavari,
                Andhra Pradesh
              </p>

              <p className="email">Email</p>

              <p>
                order@foodlovers.com
              </p>

            </div>

          </div>

        </div>
      </section>

      <footer>

        <div className="container">

          <p>
            Copyright 2025 © Food Lovers Restaurant
          </p>

        </div>

      </footer>
    </>
  );
}

export default Footer;