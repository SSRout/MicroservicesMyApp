using System;
using System.Text.Json;
using System.Threading.Tasks;
using Cart.API.Data.Interfaces;
using Cart.API.Repositories.Interfaces;

namespace Cart.API.Repositories
{
    public class CartRepo : ICartRepo
    {
        private readonly ICartContext _context;
        public CartRepo(ICartContext context)
        {
            _context = context;
        }

        public async Task<Entities.Cart> GrtCart(string userName)
        {
            var cart=await _context.Redis.StringGetAsync(userName);
             return cart.IsNullOrEmpty?null:JsonSerializer.Deserialize<Entities.Cart>(cart);
        }

        public async Task<Entities.Cart> UpdateCart(Entities.Cart cart)
        {
            var cartEdit=await _context.Redis.StringSetAsync(cart.UserName,JsonSerializer.Serialize(cart));
            if(!cartEdit) return null;

            return await GrtCart(cart.UserName);
        }
        public async Task<bool> DelteCart(string userName)
        {
            return await _context.Redis.KeyDeleteAsync(userName);
        }

    }
}