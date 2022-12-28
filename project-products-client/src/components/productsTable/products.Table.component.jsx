import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import {
  getProductsData,
  deleteProductFromDb,
} from "../../services/services.js";

import "./style.css";

export const ProductsTable = ({ setProduct }) => {
  const [productsArr, setProductsArr] = useState(undefined);

  const initProductsData = async () => {
    let products = await getProductsData();
    console.log(products);
    let producsObject = Object.values(products);
    setProductsArr(producsObject);
  };

  useEffect(() => {
    initProductsData();
  }, []);

  const handleDeleteProduct = async (ProductID) => {
    await deleteProductFromDb(ProductID);
  };

  return (
    <div className="table-container">
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th scope="col">ProductID</th>
            <th scope="col">ProductName</th>
            <th scope="col">SupplierID</th>
            <th scope="col">CategoryID</th>
            <th scope="col">QuantityPerUnit</th>
            <th scope="col">UnitPrice</th>
            <th scope="col">UnitsInStock</th>
            <th scope="col">UnitsOnOrder</th>
            <th scope="col">ReorderLevel</th>
            <th scope="col">Discontinued</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {productsArr && productsArr !== undefined ? (
          productsArr.map((p) => {
            let {
              ProductID,
              ProductName,
              SupplierID,
              CategoryID,
              QuantityPerUnit,
              UnitPrice,
              UnitsInStock,
              UnitsOnOrder,
              ReorderLevel,
              Discontinued,
            } = p;
            return (
              <tbody>
                <tr>
                  <td>
                    <Link
                      to={`/productID:${ProductID}`}
                      onClick={() => {
                        setProduct(p);
                      }}
                    >
                      {ProductID}
                    </Link>
                  </td>
                  <td>{ProductName}</td>
                  <td>{SupplierID}</td>
                  <td>{CategoryID}</td>
                  <td>{QuantityPerUnit}</td>
                  <td>{UnitPrice.Value}</td>
                  <td>{UnitsInStock}</td>
                  <td>{UnitsOnOrder}</td>
                  <td>{ReorderLevel}</td>
                  <td>{Discontinued.ByteValue}</td>
                  <td>
                    <Link
                      to="/edit"
                      onClick={() => {
                        setProduct(p);
                      }}
                    >
                      <button className="btn btn-danger">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteProduct(ProductID);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td colSpan={9}>
                <RingLoader className="spinner" color="#8d8de3" />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
