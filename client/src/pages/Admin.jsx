import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import TableMap from "../components/Admin/TableMap";
function Admin() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/admin/login", { replace: true });
};
  // Fetch all reservations
  const loadReservations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/reservations`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

      const data = await res.json();

      if (data.success) {
        setReservations(data.reservations);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load reservations when page opens
  useEffect(() => {
    loadReservations();
  }, []);

  // Update reservation status
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/reservations/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({ status }),
});

      // Reload reservations
      loadReservations();
    } catch (err) {
      console.error(err);
    }
  };
  const totalTables = 25;

const booked = reservations.filter(
    r => r.status === "Booked"
).length;

const arrived = reservations.filter(
    r => r.status === "Arrived"
).length;

const completed = reservations.filter(
    r => r.status === "Completed"
).length;

const cancelled = reservations.filter(
    r => r.status === "Cancelled"
).length;

const occupied = booked + arrived;

const available = totalTables - occupied;
const filteredReservations = reservations.filter((reservation) => {
  const matchesSearch =
    reservation.name.toLowerCase().includes(search.toLowerCase()) ||
    reservation.email.toLowerCase().includes(search.toLowerCase()) ||
    reservation.contact.includes(search);

  const matchesDate =
    !selectedDate ||
    reservation.date.slice(0, 10) === selectedDate;

  const matchesStatus =
    statusFilter === "All" ||
    reservation.status === statusFilter;

  return matchesSearch && matchesDate && matchesStatus;
});

  return (
    <div className="container">
      <h1>Reservations</h1>
    <div className="admin-container">

<div className="admin-header">
  <h1 className="admin-title">
    Restaurant Admin Dashboard
  </h1>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

<div className="dashboard-cards">

<div className="card">
<h2>{totalTables}</h2>
<p>Total Tables</p>
</div>

<div className="card">
<h2>{occupied}</h2>
<p>Occupied</p>
</div>

<div className="card">
<h2>{available}</h2>
<p>Available</p>
</div>

<div className="card">
<h2>{cancelled}</h2>
<p>Cancelled</p>
</div>

</div>
<div className="filters">

  <input
    type="text"
    placeholder="🔍 Search Name / Email / Contact"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option>All</option>
    <option>Booked</option>
    <option>Arrived</option>
    <option>Completed</option>
    <option>Cancelled</option>
  </select>

</div>
    <div className="legend">
  <span className="dot available"></span> Available
  <span className="dot booked"></span> Booked
  <span className="dot arrived"></span> Arrived
  <span className="dot completed"></span> Completed
</div>
    <TableMap reservations={filteredReservations} />
      <table  className="reservation-table">
        <thead>
          <tr>
            <th>Table</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredReservations.map((item) => (
            <tr key={item._id}>
              <td>{item.tableNumber}</td>
              <td>{item.name}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.time}</td>
              <td>{item.persons}</td>

              <td>{item.status}</td>

              <td>
                <button
  disabled={item.status !== "Booked"}
  onClick={() => updateStatus(item._id, "Arrived")}
>
  Arrived
</button>

<button
  disabled={item.status !== "Arrived"}
  onClick={() => updateStatus(item._id, "Completed")}
>
  Completed
</button>

<button
  disabled={
    item.status === "Completed" ||
    item.status === "Cancelled"
  }
  onClick={() => updateStatus(item._id, "Cancelled")}
>
  Cancel
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Admin;