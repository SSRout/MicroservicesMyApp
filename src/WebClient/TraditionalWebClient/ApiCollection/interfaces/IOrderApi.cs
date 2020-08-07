using System.Collections.Generic;
using System.Threading.Tasks;
using TraditionalWebClient.Models;

namespace TraditionalWebClient.ApiCollection.interfaces
{
    public interface IOrderApi
    {
        Task<IEnumerable<OrderResponseModel>> GetOrdersByUserName(string userName);
    }
}
