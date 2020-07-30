using System.Collections.Generic;
using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(IMongoCollection<Product> collection){
            bool Exists=collection.Find(p=>true).Any();
            if(!Exists){
                collection.InsertManyAsync(GetProducts());
            }
        }
        private static IEnumerable<Product> GetProducts()
        {
            return new List<Product>(){
                new Product(){
                    Name="Sony",
                    Summary="Summary",
                    Description="Description",
                    Category="Gadgets",
                    ImageFile="https://source.unsplash.com/200x250/?mobile",
                    Price=2200.12M,                    
                },
                 new Product(){
                    Name="Apple",
                    Summary="Summary",
                    Description="Description",
                    Category="Gadgets",
                    ImageFile="https://source.unsplash.com/200x250/?mobile",
                    Price=1200.12M,                    
                },
                 new Product(){
                    Name="Samsung",
                    Summary="Summary",
                    Description="Description",
                    Category="Gadgets",
                    ImageFile="https://source.unsplash.com/200x250/?mobile",
                    Price=1400.12M,                    
                }
            };
        }
    }
}