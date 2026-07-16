import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

function Reservation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    persons: "",
    date: "",
    time: "",
    message: "",
  });

  // 30-minute slots
  const slots = [
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, contact, email, persons, date, time } = formData;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const contactRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name))
      return alert("Please enter a valid name.");

    if (!contactRegex.test(contact))
      return alert("Enter a valid 10-digit mobile number.");

    if (!emailRegex.test(email))
      return alert("Enter a valid email.");

    if (!persons || Number(persons) <= 0)
      return alert("Enter number of persons.");

    if (!date)
      return alert("Select booking date.");

    if (!time)
      return alert("Select booking time.");

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.nextAvailable) {
          alert(
            `All tables are booked at ${time}\n\nNext Available Slot: ${data.nextAvailable}\nTable: ${data.suggestedTable}`
          );
        } else {
          alert(data.message);
        }

        return;
      }

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
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="reservation">
      <div className="container">
        <div className="form_data">
          <h3 className="normal_heading">Your Table</h3>

          <h2 className="main_heading">
            Reservation Now..
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="persons"
              placeholder="Number of Persons"
              value={formData.persons}
              onChange={handleChange}
              min="1"
              max="6"
              required
            />

            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              required
            />

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Time
              </option>

              {slots.map((slot) => {
                const [hour, minute] = slot.split(":");

                const date = new Date();

                date.setHours(hour);

                date.setMinutes(minute);

                const label = date.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <option
                    key={slot}
                    value={slot}
                  >
                    {label}
                  </option>
                );
              })}
            </select>

            <textarea
              name="message"
              rows="8"
              placeholder="Special Request"
              value={formData.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Booking..."
                : "Book Now"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;