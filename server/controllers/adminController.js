const Reservation = require("../models/Reservation");

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      reservations,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.json({
      success: true,
      reservation,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
    getReservations,
    updateReservationStatus,
};