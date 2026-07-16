import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

function Reservation(){
    const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    persons: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const handleChange = (e) => {
  let { name, value } = e.target;

  if (name === "time") {
    let [hour, minute] = value.split(":").map(Number);

    // Allow only 00 or 30 minutes
    if (minute < 30) {
      minute = 0;
    } else {
      minute = 30;
    }

    value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, contact, email, persons, date, time, message } = formData;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const contactRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name))
      return alert("Please enter a valid name.");

    if (!contactRegex.test(contact))
      return alert("Enter a valid 10-digit mobile number.");

    if (!emailRegex.test(email))
      return alert("Enter a valid email.");

    if (persons === "" || parseInt(persons) <= 0)
      return alert("Enter number of persons.");

    if (!date)
      return alert("Select booking date.");

    if (!time)
      return alert("Enter booking time.");
    setLoading(true);

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reserve`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
    const data = await res.json();
    console.log(data);
      if (data.success) {
  setFormData({
    name: "",
    contact: "",
    email: "",
    persons: "",
    date: "",
    time: "",
    message: "",
  });
  navigate("/reservation-success", {
  state: {
    reservation: data.reservation,
    tableNumber: data.tableNumber,
  },
});
} else {
  if (data.nextAvailable) {
  alert(
    `All tables are booked at ${formData.time}.\n\nNext available slot: ${data.nextAvailable}\nTable: ${data.tableNumber}`
  );
} else {
  alert(data.message);
}
}
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally{
      setLoading(false);
    }
  };

    return (
            <div id="reservation">
        <div className="container">
            <div className="form_data">
                <h3 className="normal_heading">Your Table</h3>
                <h2 className="main_heading">Reservation Now..</h2>
                <form onSubmit={handleSubmit}>
        
                     <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="number"
              name="persons"
              placeholder="Number of Persons"
              value={formData.persons}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
            />

            <input
  type="time"
  name="time"
  value={formData.time}
  onChange={handleChange}
  step="1800" // 1800 seconds = 30 minutes
  required
/>

            <textarea
              name="message"
              rows="8"
              placeholder="Message Request"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
  {loading ? "Booking..." : "Book Now"}
</button>
                </form>
            </div>
        </div>
    </div>
    );
}
export default Reservation;