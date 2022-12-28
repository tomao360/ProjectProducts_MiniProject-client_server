import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ProductsTable,
  ProductInfo,
  SidebarComponent,
  EditProduct,
} from "../index";
import { About, HomePage, ContactUs, PageNotFound, User } from "../../pages";

export const Main = (props) => {
  const [product, setProduct] = useState({});
  console.log(product);

  return (
    <div className="app">
      <div>
        <SidebarComponent />
      </div>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/products"
            element={<ProductsTable setProduct={setProduct} />}
          />
          <Route
            path={`/productID:${product.ProductID}`}
            element={<ProductInfo productID={product.ProductID} />}
          />
          <Route path="/user" element={<User />} />
          <Route path="/edit" element={<EditProduct product={product} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};
