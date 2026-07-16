import Home from "../components/Home/Home";
import Special from "../components/Special/Special";
import Reservation from "../components/Reservation/Reservation";
import Deal from "../components/Deal/Deal";
import Menu from "../components/Menu/Menu";
import Feedback from "../components/Feedback/Feedback";
import Blog from "../components/Blog/Blog";
import Static from "../components/Static/Static";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Home />
      <Special />
      <Reservation />
      <Deal />
      <Menu />
      <Feedback />
      <Blog />
      <Static />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;