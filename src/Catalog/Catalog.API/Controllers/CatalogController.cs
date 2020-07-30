using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Catalog.API.Data;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Catalog.API.Controllers
{
    public class CatalogController : BaseApiController
    {
        private readonly IProductRepo _repo;
        private readonly ILogger<CatalogContext> _logger;
        public CatalogController(IProductRepo repo, ILogger<CatalogContext> logger)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _repo.GetProducts();
            return Ok(products);
        }

        [HttpGet("{id:length(24)}",Name="GetProduct")]
        [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Product), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Product>> GetProduct(string id)
        {
            var product = await _repo.GetProduct(id);
            if (product == null)
            {
                _logger.LogError($"Product {id} not found");
                return NotFound();
            }
            return Ok(product);
        }

        [Route("[action]/{category}")]
        [HttpGet()]
        [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory(string category)
        {
            var products = await _repo.GetProductByCategory(category);
            return Ok(products);
        }

        [Route("[action]/{name}")]
        [HttpGet()]
        [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByName(string name)
        {
            var products = await _repo.GetProductByName(name);
            return Ok(products);
        }


        [HttpPost]
        [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
        {
            await _repo.Create(product);
            return CreatedAtRoute("GetProduct",new{id=product.Id},product);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> UpadteProduct([FromBody] Product product)
        {
            return Ok(await _repo.Upadate(product));
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> DeleteProduct(string id)
        {
          return Ok(await _repo.Delete(id));
        }

    }
}