import "./TableMap.css";

function TableMap({ reservations }) {
  const tables = [];

  for (let i = 1; i <= 25; i++) {
    const reservation = reservations.find(
      (r) =>
        r.tableNumber === i &&
        (r.status === "Booked" || r.status === "Arrived")
    );

    let status = "available";

    if (reservation) {
      status = reservation.status.toLowerCase();
    }

    tables.push(
      <div
        key={i}
        className={`table-card ${status}`}
        title={
          reservation
            ? `${reservation.name}
Guests: ${reservation.persons}
Time: ${reservation.time}`
            : "Available"
        }
      >
        <h3>T{i}</h3>

        {reservation ? (
          <>
            <p>{reservation.name}</p>
            <small>{reservation.time}</small>
          </>
        ) : (
          <p>Available</p>
        )}
      </div>
    );
  }

  return (
    <>
      <h2>Restaurant Floor</h2>

      <div className="table-grid">{tables}</div>
    </>
  );
}

export default TableMap;