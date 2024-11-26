import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import Product from "../models/product.model.js";

describe("Product API Tests", () => {
  // Datos de ejemplo basados en la imagen
  const sampleProduct = {
    name: "Cake",
    quantity: 4,
    price: 45.99,
  };

  const expectedProducts = [
    {
      name: "Cake",
      quantity: 4,
      price: 45.99,
    },
    {
      name: "Donuts",
      quantity: 12,
      price: 59.99,
    },
    {
      name: "Pie",
      quantity: 9,
      price: 36.99,
    },
    {
      name: "Chocolate",
      quantity: 14,
      price: 49.99,
    },
  ];

  beforeAll(async () => {
    // Conectar a una base de datos de prueba
    await mongoose.connect(
      process.env.MONGODB || "mongodb://localhost:3000/api/products"
    );
  });

  afterAll(async () => {
    // Limpiar la base de datos y cerrar conexión
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpiar la colección antes de cada test
    await Product.deleteMany({});
  });

  describe("GET /api/products", () => {
    it("should get all products", async () => {
      // Insertar productos de prueba
      await Product.insertMany(expectedProducts);

      const response = await request(app).get("/api/products").expect(200);

      expect(response.body.length).toBe(4);
      expect(response.body[0].name).toBe("Cake");
      expect(response.body[1].name).toBe("Donuts");
    });
  });

  describe("GET /api/products/:id", () => {
    it("should get a single product", async () => {
      const product = await Product.create(sampleProduct);

      const response = await request(app)
        .get(`/api/products/${product._id}`)
        .expect(200);

      expect(response.body.name).toBe("Cake");
      expect(response.body.quantity).toBe(4);
      expect(response.body.price).toBe(45.99);
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const response = await request(app)
        .post("/api/products")
        .send(sampleProduct)
        .expect(200);

      expect(response.body.name).toBe("Cake");
      expect(response.body.quantity).toBe(4);
      expect(response.body.price).toBe(45.99);
    });
  });
});
