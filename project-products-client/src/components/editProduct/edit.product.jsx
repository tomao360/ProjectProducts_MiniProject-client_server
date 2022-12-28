import React, { useState } from "react";

import { updateProductData } from "../../services/services";

export const EditProduct = ({ product }) => {
  console.log(product);
  const [editProduct, setEditProduct] = useState({
    ProductName: "",
    CategoryID: "",
    UnitsInStock: "",
  });

  const handleUpdateProduct = async () => {
    product.ProductName = editProduct.ProductName;
    product.CategoryID = parseInt(editProduct.CategoryID);
    product.UnitsInStock = parseInt(editProduct.UnitsInStock);
    await updateProductData(product, product.ProductID);
    setEditProduct({});
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  };

  return (
    <div className="student-inputs ">
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Product Name
        </span>
        <input
          className="form-control"
          type="text"
          aria-label="default input example"
          onChange={(o) => {
            setEditProduct({ ...editProduct, ProductName: o.target.value });
          }}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          CategoryID
        </span>
        <input
          className="form-control"
          type="number"
          aria-label="default input example"
          onChange={(o) => {
            setEditProduct({ ...editProduct, CategoryID: o.target.value });
          }}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          UnitsInStock
        </span>
        <input
          className="form-control"
          type="number"
          aria-label="default input example"
          onChange={(o) => {
            setEditProduct({ ...editProduct, UnitsInStock: o.target.value });
          }}
        />
      </div>
      <button className="btn btn-secondary" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};
