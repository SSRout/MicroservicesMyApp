using System.Collections.Generic;
using System.Threading.Tasks;
using TraditionalWebClient.Models;

namespace TraditionalWebClient.ApiCollection.interfaces
{
    public interface ICatalogApi
    {
        Task<IEnumerable<CatalogModel>> GetCatalog();
        Task<IEnumerable<CatalogModel>> GetCatalogByCategory(string category);
        Task<CatalogModel> GetCatalog(string id);
        Task<CatalogModel> CreateCatalog(CatalogModel model);
    }
}
