using AutoMapper;
using Cart.API.Entities;
using EventBusRabbitMq.Events;
namespace Cart.API.Mapping
{
    public class CartMapping:Profile
    {
        public CartMapping()
        {
           CreateMap<CheckOut,CartCheckoutEvent>().ReverseMap();
        }
    }
}