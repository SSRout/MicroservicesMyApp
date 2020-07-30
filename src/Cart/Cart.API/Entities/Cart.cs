using System.Collections.Generic;

namespace Cart.API.Entities
{
    public class Cart
    {
        public string  UserName { get; set; }   
        public List<CartItem> Items { get; set; }   =new List<CartItem>();
        public decimal TotalPrice { get
            {
                decimal totalprice = 0;
                foreach (var item in Items)
                {
                    totalprice += item.Price * item.Quantity;
                }

                return totalprice;
            } }
        public Cart()
        {
            
        }
        public Cart(string name)
        {
            UserName=name;
        }
    }
}