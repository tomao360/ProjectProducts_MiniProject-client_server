using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ProjectProducts.Entities;
using ProjectProducts.Model;
using System.Collections.Generic;
using System.Net;

namespace ProjectProducts.MicroServer
{
    //http://localhost:7243/api/Products/Get
    //http://localhost:7243/api/Products/Get/1234
    //http://localhost:7243/api/Products/Add
    //http://localhost:7243/api/Products/Update/1234
    //http://localhost:7243/api/Products/Remove/1234
    public static class Function1
    {
        [FunctionName("Products")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "put", "delete", Route = "Products/{action}/{IdNumber?}")] HttpRequest req, string action, string IdNumber, ILogger log)
        {
            string requestBody;

            switch (action)
            {
                case "Get":
                    if (IdNumber == null)
                    {
                        ////Serialize the products data to a JSON string
                        string responseMessage = System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.products.GetProductsFromDB());
                        //Return an OK result with the serialized data
                        return new OkObjectResult(responseMessage);
                    }
                    else
                    {
                        ////Serialize the products data to a JSON string
                        string responseMessage = System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.products.GetProductFromDbById(int.Parse(IdNumber)));
                        //Return an OK result with the serialized data
                        return new OkObjectResult(responseMessage);
                    }

                case "Add":                
                    //Read the request body and deserialize it to a ContactUsUser object
                    requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                    ContactUsUser contactUsUser = System.Text.Json.JsonSerializer.Deserialize<ContactUsUser>(requestBody);
                    //Check that all required fields in the ContactUsUser object are not null
                    if (contactUsUser.FirstName != null && contactUsUser.LastName != null && contactUsUser.Email != null && contactUsUser.UserMessage != null)
                    {
                        //Insert the user message into the database
                        MainManager.Instance.contactUs.InsertUserMessageToDb(contactUsUser.FirstName, contactUsUser.LastName, contactUsUser.Email, contactUsUser.UserMessage);

                        //Return an OK result
                        return new OkObjectResult("This POST request executed successfully");
                    }

                    //Return a BadRequest result if the required fields are null
                    return new BadRequestObjectResult("Failed POST Request");

                case "Update":
                    try
                    {
                        requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                        Product product = System.Text.Json.JsonSerializer.Deserialize<Product>(requestBody);
                        MainManager.Instance.products.UpdateAProductInDb(int.Parse(IdNumber), product.ProductName, product.CategoryID, product.UnitsInStock);
                        


                    }
                    catch (Exception ex) 
                    {
                        Console.WriteLine(ex);
                    }
                    return new OkResult();

                case "Remove":
                    
                    MainManager.Instance.products.DeleteAProductByProductID(int.Parse(IdNumber));
                    return new OkResult();


                default:
                    return new BadRequestObjectResult("Failed Request");
            }
         
        }
    }
}
