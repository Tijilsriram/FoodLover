import logo from "../../assets/images/logo1.png";
import "./Home.css";
function Home(){
    return (  
    <main id="home">
        <div className="container">
            <div className="content">
                <img src={logo} alt="food" />
                <h2>SURPRISE YOUR TABLE</h2>
                <h3>Fine Food + Drinks</h3>
            </div>
        </div>
    </main>
    );
}
export default Home;