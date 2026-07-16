const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

dotenv.config();

// Force Node to use a public DNS resolver instead of the
// system/VPN resolver, which is failing on SRV lookups
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/", reservationRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", authRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("========== MONGODB ERROR ==========");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error("Cause:", err.cause);
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Restaurant backend is running successfully 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);