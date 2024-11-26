import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

const DB = process.env.MONGODB;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server 2");
});

// Inicializar la variable del servidor
let server;

if (process.env.MONGODB !== "test") {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Conectado a la base de datos");
      server = app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch(() => {
      console.log("Error en la conexión en la base de datos");
    });
}

export { app, server }; // Exportar tanto app como server
