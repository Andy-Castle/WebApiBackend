import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

const DB = process.env.MONGODB;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server 2");
});

// Exportar app para testing
export default app;

// Modificar la parte de conexión para que solo se ejecute si no estamos en test
if (process.env.MONGODB !== "test") {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Conectado a la base de datos");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch(() => {
      console.log("Error en la conexion en la base de datos");
    });
}

//Hello
