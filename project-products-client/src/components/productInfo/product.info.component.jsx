import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import { getProductDataById } from "../../services/services";

import "./style.css";

// export const ProductInfo = ({
//   productID,
//   productName,
//   categoryId,
//   unitPrice,
// }) => {
//   return (
//     <div className="card product-container">
//       <div className="card-body">
//         <h2 className="card-title">{productName}</h2>
//         <h5>Product ID: {productID}</h5>
//         <h5>Category ID: {categoryId}</h5>
//         <h5>Unit Price: {unitPrice}</h5>
//         <Link to="/products">
//           <button className="btn btn-primary">Return To Products</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

export const ProductInfo = ({ productID }) => {
  const [product, setProduct] = useState(undefined);

  const initProductData = async () => {
    let product = await getProductDataById(productID);
    console.log(product);
    console.log(product, "HI");
    setProduct(product);
  };

  useEffect(() => {
    initProductData();
  }, []);

  return product && product !== undefined ? (
    <div className="card product-container">
      <div className="card-body">
        {product.ProductName && (
          <h2 className="card-title">{product.ProductName}</h2>
        )}
        {product.ProductID && <h5>Product ID: {product.ProductID}</h5>}
        {product.CategoryID && <h5>Category ID: {product.CategoryID}</h5>}
        {product.UnitPrice && product.UnitPrice.Value && (
          <h5>Unit Price: {product.UnitPrice.Value}</h5>
        )}
        <Link to="/products">
          <button className="btn btn-primary">Return To Products</button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="spinner-app">
      <RingLoader color="#8d8de3" size={300} />
    </div>
  );
};
