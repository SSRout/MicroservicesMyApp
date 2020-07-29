namespace Catalog.API.Settings
{
    public interface ICatalogDbSettings
    {
         string ConnectionString{get;set;}
         string DatabseName{get;set;}
         string CollectionName{get;set;}
    }
}