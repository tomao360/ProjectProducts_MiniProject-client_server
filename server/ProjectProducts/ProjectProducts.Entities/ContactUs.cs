using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectProducts.DAL;
using ProjectProducts.Model;

namespace ProjectProducts.Entities
{
    public class ContactUs
    {
        //Insert a user massage that we get from client side to DB -> ContactUs table
        public void InsertUserMessageToDb(string firstName, string lastName, string email, string userMessage)
        {
            string connectionString = @"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=Northwind;Data Source=localhost\SQLEXPRESS";

            string insert = "declare @messageID int\r\ninsert into ContactUs values(@fullName, @email, @userMessage)\r\nselect @messageID = @@IDENTITY";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(insert, connection))
                    {
                        connection.Open();

                        //Add the user message data as parameters to the command
                        command.Parameters.AddWithValue("@fullName", firstName + " " + lastName);
                        command.Parameters.AddWithValue("@email", email);
                        command.Parameters.AddWithValue("@userMessage", userMessage);

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
    }
}






