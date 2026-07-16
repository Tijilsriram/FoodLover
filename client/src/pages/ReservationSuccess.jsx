import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./ReservationSuccess.css";

function ReservationSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();   // ✅ Move here
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />

        <h1>Reservation Confirmed!</h1>

        <h3>Table No: {state?.tableNumber}</h3>
        <p>Date: {state?.reservation?.date}</p>
        <p>Time: {state?.reservation?.time}</p>
        <p>Guests: {state?.reservation?.persons}</p>

        <p>Thank you for your reservation. We look forward to serving you!</p>

        <p className="redirect-text">
          Redirecting to Home in <strong>{seconds}</strong> seconds...
        </p>

        <Link to="/" className="home-btn">
          Go to Home Now
        </Link>
      </div>
    </div>
  );
}

export default ReservationSuccess;