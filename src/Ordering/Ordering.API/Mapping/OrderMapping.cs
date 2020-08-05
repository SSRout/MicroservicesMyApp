using AutoMapper;
using EventBusRabbitMq.Events;
using Ordering.Application.Commands;

namespace Ordering.API.Mapping
{
    public class OrderMapping:Profile
    {
        public OrderMapping()
        {
            CreateMap<CartCheckoutEvent, CheckoutOrderCommand>().ReverseMap();
        }
    }
}