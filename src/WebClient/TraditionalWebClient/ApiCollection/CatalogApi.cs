using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TraditionalWebClient.ApiCollection.Infrastructure;
using TraditionalWebClient.ApiCollection.interfaces;
using TraditionalWebClient.Models;
using TraditionalWebClient.Settings;

namespace TraditionalWebClient.ApiCollection
{
    public class CatalogApi :BaseHttpClientWithFactory, ICatalogApi
    {
        private readonly IApiSettings _apiSettings;

        public CatalogApi(IHttpClientFactory factory,IApiSettings apiSettings) : base(factory)
        {
            _apiSettings = apiSettings;
        }

        public async Task<CatalogModel> CreateCatalog(CatalogModel catalogModel)
        {
            var message = new HttpRequestBuilder(_apiSettings.BaseAddress)
                                .SetPath(_apiSettings.CatalogPath)
                                .HttpMethod(HttpMethod.Post)
                                .GetHttpMessage();

            var json = JsonConvert.SerializeObject(catalogModel);
            message.Content = new StringContent(json, Encoding.UTF8, "application/json");

            return await SendRequest<CatalogModel>(message);
        }

        public async Task<IEnumerable<CatalogModel>> GetCatalog()
        {
            var message = new HttpRequestBuilder(_apiSettings.BaseAddress)
                             .SetPath(_apiSettings.CatalogPath)
                             .HttpMethod(HttpMethod.Get)
                             .GetHttpMessage();

            return await SendRequest<IEnumerable<CatalogModel>>(message);
        }

        public async Task<CatalogModel> GetCatalog(string id)
        {
            var message = new HttpRequestBuilder(_apiSettings.BaseAddress)
                              .SetPath(_apiSettings.CatalogPath)
                              .AddToPath(id)
                              .HttpMethod(HttpMethod.Get)
                              .GetHttpMessage();

            return await SendRequest<CatalogModel>(message);
        }

        public async Task<IEnumerable<CatalogModel>> GetCatalogByCategory(string category)
        {
            var message = new HttpRequestBuilder(_apiSettings.BaseAddress)
                                .SetPath(_apiSettings.CatalogPath)
                                .AddToPath("GetProductByCategory")
                                .AddToPath(category)
                                .HttpMethod(HttpMethod.Get)
                                .GetHttpMessage();

            return await SendRequest<IEnumerable<CatalogModel>>(message);
        }
    }
}
