using ProjectProducts.DAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace ProjectProducts.DAL
{
    public class SqlQuery
    {
        //Delegate
        public delegate object SetResultDataReader_delegate(SqlDataReader reader);

        //Function to get Data from SQL and returns an Object
        public static object RunCommandResult(string sqlQuery, SetResultDataReader_delegate func)
        {
            object ret = null;
            string connectionString = @"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=Northwind;Data Source=localhost\SQLEXPRESS";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string queryString = sqlQuery;

                //Adapter
                using (SqlCommand command = new SqlCommand(queryString, connection))
                {
                    connection.Open();

                    //Reader
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        ret = func(reader);
                    }
                }
            }

            return ret;
        }

        //Function to Insert/Update/Delete Data into/from DB (SQL)
        public static void RunNonQuery(string sqlQuery)
        {
            string connectionString = ConfigurationManager.AppSettings["connectionString"];

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string queryString = sqlQuery;

                //Adapter
                using (SqlCommand command = new SqlCommand(queryString, connection))
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}


