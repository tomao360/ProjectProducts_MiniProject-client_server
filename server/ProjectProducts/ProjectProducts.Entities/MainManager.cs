using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectProducts.Entities
{
    public class MainManager
    {
        private MainManager() { }

        private static readonly MainManager _instance = new MainManager();
        public static MainManager Instance { get { return _instance; } }

        public Products products = new Products();
       
        public ContactUs contactUs = new ContactUs();
    }
}
