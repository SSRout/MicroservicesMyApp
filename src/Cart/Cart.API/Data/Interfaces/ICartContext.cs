using StackExchange.Redis;

namespace Cart.API.Data.Interfaces
{
    public interface ICartContext
    {
         IDatabase Redis{get;}
    }
}