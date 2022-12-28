using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectProducts.Model;
using ProjectProducts.DAL;
using System.Runtime.Remoting.Messaging;


namespace ProjectProducts.Entities
{
    public class Products
    {
        Dictionary<int, Product> productsDic = new Dictionary<int, Product>();

        public Dictionary<int, Product> GetProductsFromDB()
        {
            Data.Sql.ProductSql product = new Data.Sql.ProductSql();
            productsDic = (Dictionary<int, Product>)product.LoadProducts();
            return productsDic;
        }

        public Product GetProductFromDbById(int id)
        {
            Data.Sql.ProductSql product = new Data.Sql.ProductSql();
            Product product1 = (Product)product.LoadOneProductObject(id);
            return product1;
        }

        public void UpdateAProductInDb(int productID, string productName, int categoryID, int unitsInStock)
        {
            Data.Sql.ProductSql product = new Data.Sql.ProductSql();
            product.UpdateAProduct(productID, productName, categoryID, unitsInStock);
        }

        public void DeleteAProductByProductID(int productID)
        {
            Data.Sql.ProductSql product = new Data.Sql.ProductSql();
            product.DeleteProduct(productID);
        }


        //// Get Product from dictionary by ProductID
        //public Product GetProductById(int productId)
        //{
        //    if (!productsDic.ContainsKey(productId)) return null;

        //    Product product = productsDic[productId];
        //    return product;
        //}
    }
}
