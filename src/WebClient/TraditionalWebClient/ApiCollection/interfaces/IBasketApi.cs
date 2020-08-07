using System.Threading.Tasks;
using TraditionalWebClient.Models;

namespace TraditionalWebClient.ApiCollection.interfaces
{
    public interface IBasketApi
    {
        Task<BasketModel> GetBasket(string userName);
        Task<BasketModel> UpdateBasket(BasketModel model);
        Task CheckoutBasket(BasketCheckoutModel model);
    }
}
