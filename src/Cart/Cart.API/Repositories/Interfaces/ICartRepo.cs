using System.Threading.Tasks;
using Basket=Cart.API.Entities;
namespace Cart.API.Repositories.Interfaces
{
    public interface ICartRepo
    {
         Task<Basket.Cart> GrtCart(string userName);
         Task<Basket.Cart> UpdateCart(Basket.Cart cart);
         Task<bool> DelteCart(string userName);
    }
}