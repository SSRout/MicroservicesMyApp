namespace Cart.API.Entities
{
    public class CartItem
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductId { get; set; }   
        public string ProductName { get; set; }
    }
}