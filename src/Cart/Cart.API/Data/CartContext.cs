using Cart.API.Data.Interfaces;
using StackExchange.Redis;

namespace Cart.API.Data
{
    public class CartContext : ICartContext
    {
        private readonly ConnectionMultiplexer _redis;
        public CartContext(ConnectionMultiplexer redis)
        {
            _redis = redis;
            Redis=redis.GetDatabase();
        }

        public IDatabase Redis{get;}
    }
}