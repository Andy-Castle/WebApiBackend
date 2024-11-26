import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductPatch,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

//update a product
router.put("/:id", updateProduct);

//update with patch a produc
router.patch("/:id", updateProductPatch);

//delete a product
router.delete("/:id", deleteProduct);

export default router;
