const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const {
  getReservations,
  updateReservationStatus,
} = require("../controllers/adminController");

router.get(
  "/reservations",
  verifyAdmin,
  getReservations
);

router.put(
  "/reservations/:id",
  verifyAdmin,
  updateReservationStatus
);
module.exports = router;