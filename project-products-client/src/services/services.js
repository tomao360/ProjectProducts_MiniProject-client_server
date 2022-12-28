import axios from "axios";

//Get all products
export const getProductsData = async () => {
  try {
    let endpoint = "http://localhost:7243/api/Products/Get";
    let response = await axios.get(endpoint);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Get one product
export const getProductDataById = async (productId) => {
  try {
    let endpoint = `http://localhost:7243/api/Products/Get/${productId}`;
    let response = await axios.get(endpoint);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Update a product
export const updateProductData = async (product, productID) => {
  try {
    console.log(product, "111111");
    await axios.put(
      `http://localhost:7243/api/Products/Update/${productID}`,
      product
    );
  } catch (error) {
    console.error(error);
  }
};

//Delete a product
export const deleteProductFromDb = async (productID) => {
  try {
    console.log(productID);
    let endpoint = `http://localhost:7243/api/Products/Remove/${productID}`;
    await axios.delete(endpoint);
  } catch (error) {
    console.error(error);
  }
};

//Add userMessage to DB
export const addUserMessageToDb = async (userMessage) => {
  try {
    console.log(userMessage);
    let endpoint = "http://localhost:7243/api/Products/Add";
    await axios.post(endpoint, userMessage);
  } catch (error) {
    console.error(error);
  }
};
