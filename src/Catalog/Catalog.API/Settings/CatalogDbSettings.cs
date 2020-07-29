namespace Catalog.API.Settings
{
    public class CatalogDbSettings : ICatalogDbSettings
    {
        public string ConnectionString {get;set;}
        public string DatabseName {get;set;}
        public string CollectionName {get;set;}
    }
}