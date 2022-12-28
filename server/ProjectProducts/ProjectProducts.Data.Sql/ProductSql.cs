using ProjectProducts.DAL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectProducts.Model;

namespace ProjectProducts.Data.Sql
{
    public class ProductSql
    {

        //Function that gets data from the Products table in the Northwind database, using the provided SqlDataReader, and adds it to the products dictionary.
        public Dictionary<int, Product> AddProductToDictionary(SqlDataReader reader)
        {
            //Create a dictionary that will contain the products data. The key of the dictionary is the product's ID and the value is the Product object
             Dictionary<int, Product> productsDic = new Dictionary<int, Product>();

            //Clear the dictionary before adding new products.
            productsDic.Clear();

            while (reader.Read())
            {
                Product product = new Product();

                product.ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"));
                product.ProductName = reader.GetString(reader.GetOrdinal("ProductName"));
                product.SupplierID = reader.GetInt32(reader.GetOrdinal("SupplierID"));
                product.CategoryID = reader.GetInt32(reader.GetOrdinal("CategoryID"));
                product.QuantityPerUnit = reader.GetString(reader.GetOrdinal("QuantityPerUnit"));
                product.UnitPrice = reader.GetSqlMoney(reader.GetOrdinal("UnitPrice"));
                product.UnitsInStock = reader.GetInt16(reader.GetOrdinal("UnitsInStock"));
                product.UnitsOnOrder = reader.GetInt16(reader.GetOrdinal("UnitsOnOrder"));
                product.ReorderLevel = reader.GetInt16(reader.GetOrdinal("ReorderLevel"));
                product.Discontinued = reader.GetSqlBoolean(reader.GetOrdinal("Discontinued"));

                //Add the new Product object to the dictionary
                productsDic.Add(product.ProductID, product);
            }

            //Return the updated dictionary
            return productsDic;
        } 


        //Function that loads all the products from the Northwind database into the products dictionary
        public object LoadProducts()
        {
            object retDictionary = null;

            try
            {
                string sqlQuery = "select * from Products";
                retDictionary = SqlQuery.RunCommandResult(sqlQuery, AddProductToDictionary);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return retDictionary;
        }

        //Function that loads one the product from the Northwind database with ProductID
        public object LoadOneProductObject(int productID)
        {
            string connectionString = @"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=Northwind;Data Source=localhost\SQLEXPRESS";

            string select = "select * from Products where ProductID = @productID";

            Product product = new Product();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(select, connection))
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@productID", productID);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                product.ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"));
                                product.ProductName = reader.GetString(reader.GetOrdinal("ProductName"));
                                product.SupplierID = reader.GetInt32(reader.GetOrdinal("SupplierID"));
                                product.CategoryID = reader.GetInt32(reader.GetOrdinal("CategoryID"));
                                product.QuantityPerUnit = reader.GetString(reader.GetOrdinal("QuantityPerUnit"));
                                product.UnitPrice = reader.GetSqlMoney(reader.GetOrdinal("UnitPrice"));
                                product.UnitsInStock = reader.GetInt16(reader.GetOrdinal("UnitsInStock"));
                                product.UnitsOnOrder = reader.GetInt16(reader.GetOrdinal("UnitsOnOrder"));
                                product.ReorderLevel = reader.GetInt16(reader.GetOrdinal("ReorderLevel"));
                                product.Discontinued = reader.GetSqlBoolean(reader.GetOrdinal("Discontinued"));
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return product;
        }


        //Function that updates a product in the Northwind database
        public void UpdateAProduct(int productID, string productName, int categoryID, int unitsInStock)
        {
            string connectionString = @"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=Northwind;Data Source=localhost\SQLEXPRESS";

            string update = "update Products set ProductName = @productName, CategoryID = @categoryID, UnitsInStock = @unitsInStock where ProductID = @productID";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(update, connection))
                    {
                        connection.Open();

                        command.Parameters.AddWithValue("@productID", productID);
                        command.Parameters.AddWithValue("@productName", productName);
                        command.Parameters.AddWithValue("@categoryID", categoryID);
                        command.Parameters.AddWithValue("@unitsInStock", unitsInStock);

                        //Execute the command
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        //Function that deletes a product in the Northwind database
        public void DeleteProduct(int productID)
        {
            string connectionString = @"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=Northwind;Data Source=localhost\SQLEXPRESS";

            string delete = "delete from NewProductTable where ProductID = @productID ";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(delete, connection))
                    {
                        connection.Open();

                        command.Parameters.AddWithValue("@productID", productID);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }


    }
}
