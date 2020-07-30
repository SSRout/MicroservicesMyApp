using System.Collections.Generic;
using System.Threading.Tasks;
using Catalog.API.Data.Interfaces;
using Catalog.API.Entities;
using Catalog.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Catalog.API.Repositories
{
    public class ProductRepo : IProductRepo
    {
        private readonly ICatalogContext _context;
        public ProductRepo(ICatalogContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.Find(p=>true).ToListAsync();
        }

        public async Task<Product> GetProduct(string id)
        {
             return await _context.Products.Find(p=>p.Id==id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetProductByName(string name)
        {
           //FilterDefinition<Product> filter=Builders<Product>.Filter.ElemMatch(n=>n.Name,name);
           var query= _context.Products.Find(n=>n.Name.Equals(name));
            return await query.ToListAsync();
        }
        public async Task<IEnumerable<Product>> GetProductByCategory(string category)
        {
            var query= _context.Products.Find(n=>n.Category.Equals(category));
            return await query.ToListAsync();
        }
  

        public async Task Create(Product product)
        {
            await _context.Products.InsertOneAsync(product);
        }

        public async Task<bool> Upadate(Product product)
        {
            var result=await _context.Products.ReplaceOneAsync(filter:x=>x.Id==product.Id,replacement:product);
            return result.IsAcknowledged && result.ModifiedCount>0;
        }
        public async Task<bool> Delete(string id)
        {
          FilterDefinition<Product> filter=Builders<Product>.Filter.Eq(n=>n.Id,id);
          DeleteResult result=await _context.Products.DeleteOneAsync(filter);
          return result.IsAcknowledged && result.DeletedCount>0;
        }

    }
}