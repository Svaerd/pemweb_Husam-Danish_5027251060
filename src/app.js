const express = require("express");
const productRoutes = require("./routes/products.routes");

const app = express();

// Middleware agar req.body terbaca sebagai JSON.
app.use(express.json());

app.use("/", productRoutes);

// Fallback: endpoint tidak dikenal.
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak dikenal" });
});

module.exports = app;
