const Reservation = require("../models/Reservation");
const generateSlots = require("../utils/timeSlots");
const TABLES = require("../utils/tableConfig");
const transporter = require("../utils/sendMail");

// Find best available table
const findAvailableTable = async (date, time, persons) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const reservations = await Reservation.find({
    date: {
      $gte: start,
      $lte: end,
    },
    time,
    status: "Booked",
  });

  const bookedTables = reservations.map((r) => r.tableNumber);

  for (const table of TABLES) {
    if (
      table.seats >= persons &&
      !bookedTables.includes(table.number)
    ) {
      return table.number;
    }
  }

  return null;
};

const timeToMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

const createReservation = async (req, res) => {
  try {
    const {
      name,
      contact,
      email,
      persons,
      date,
      time,
      message,
    } = req.body;

    const bookingDate = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: "Past dates are not allowed.",
      });
    }

    if (persons < 1 || persons > 6) {
      return res.status(400).json({
        success: false,
        message: "Reservations allowed only for 1-6 guests.",
      });
    }
        // -------------------------
    // Opening Hours Validation
    // -------------------------
    const day = bookingDate.getDay();

    const validSlots = generateSlots(day);

    if (!validSlots.includes(time)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is closed during this time.",
      });
    }

    // -------------------------
    // Duplicate Reservation Check
    // -------------------------
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const duplicate = await Reservation.findOne({
      email,
      date: {
        $gte: start,
        $lte: end,
      },
      time,
      status: "Booked",
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "You already have a reservation for this date and time.",
      });
    }

    // -------------------------
    // Find Available Table
    // -------------------------
    let tableNumber = await findAvailableTable(
      date,
      time,
      Number(persons)
    );

    // -------------------------
    // No Table Available
    // -------------------------
    if (!tableNumber) {
      let nextAvailable = null;
      let suggestedTable = null;

      const currentIndex = validSlots.indexOf(time);

      for (let i = currentIndex + 1; i < validSlots.length; i++) {
        const table = await findAvailableTable(
          date,
          validSlots[i],
          Number(persons)
        );

        if (table) {
          nextAvailable = validSlots[i];
          suggestedTable = table;
          break;
        }
      }

      if (nextAvailable) {
        return res.status(409).json({
          success: false,
          message: `All suitable tables are booked at ${time}.`,
          nextAvailable,
          suggestedTable,
        });
      }

      return res.status(409).json({
        success: false,
        message: "Sorry! No suitable tables are available for the rest of the day.",
      });
    }
        // -------------------------
    // Create Reservation
    // -------------------------
    const reservation = await Reservation.create({
      name,
      contact,
      email,
      persons,
      date,
      time,
      message,
      tableNumber,
      status: "Booked",
    });

    // -------------------------
    // Send Emails
    // -------------------------
    try {
      // Customer Email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reservation Confirmed - Food Lovers",
        html: `
          <h2>Reservation Confirmed ✅</h2>

          <p>Hello <b>${name}</b>,</p>

          <p>Your reservation has been confirmed successfully.</p>

          <table border="1" cellspacing="0" cellpadding="8">
            <tr>
              <td><b>Reservation ID</b></td>
              <td>${reservation._id}</td>
            </tr>

            <tr>
              <td><b>Table Number</b></td>
              <td>${tableNumber}</td>
            </tr>

            <tr>
              <td><b>Date</b></td>
              <td>${date}</td>
            </tr>

            <tr>
              <td><b>Time</b></td>
              <td>${time}</td>
            </tr>

            <tr>
              <td><b>Guests</b></td>
              <td>${persons}</td>
            </tr>
          </table>

          <br>

          <p>Thank you for choosing <b>Food Lovers Restaurant</b>.</p>

          <p>We look forward to serving you ❤️</p>
        `,
      });

      // Admin Email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Reservation Received",
        html: `
          <h2>New Reservation</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${contact}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Guests:</b> ${persons}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
          <p><b>Table:</b> ${tableNumber}</p>

          <hr>

          <p><b>Reservation ID:</b> ${reservation._id}</p>
        `,
      });

      console.log("Emails sent successfully.");
    } catch (mailError) {
      console.error("Mail Error:", mailError);
      // Reservation is already saved, so continue even if email fails.
    }

    return res.status(201).json({
      success: true,
      message: "Reservation Confirmed",
      reservation,
      tableNumber,
    });

  } catch (error) {
    console.error("Reservation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
};