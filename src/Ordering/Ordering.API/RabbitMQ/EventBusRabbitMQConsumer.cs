using System.Text;
using System.Text.Json;
using AutoMapper;
using EventBusRabbitMq;
using EventBusRabbitMq.Common;
using EventBusRabbitMq.Events;
using MediatR;
using Ordering.Application.Commands;
using Ordering.Core.Repositories;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Ordering.API.RabbitMQ
{
    public class EventBusRabbitMQConsumer
    {
        private readonly IRabbitMqConnection _connection;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _repository;
        public EventBusRabbitMQConsumer(IRabbitMqConnection connection, IMediator mediator, IMapper mapper, IOrderRepository repository)
        {
            _repository = repository;
            _mapper = mapper;
            _mediator = mediator;
            _connection = connection;

        }

         public void Consume()
        {
            var channel = _connection.CreateModel();
            channel.QueueDeclare(queue: EventBusConstants.CartCheckoutQueue, durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

            //Create event when something receive
            consumer.Received += ReceivedEvent;

            channel.BasicConsume(queue: EventBusConstants.CartCheckoutQueue, autoAck: true, consumer: consumer);
        }

        private async void ReceivedEvent(object sender, BasicDeliverEventArgs e)
        {
            if (e.RoutingKey == EventBusConstants.CartCheckoutQueue)
            {
                var message = Encoding.UTF8.GetString(e.Body.Span);
                var cartCheckoutEvent = JsonSerializer.Deserialize<CartCheckoutEvent>(message);

                // EXECUTION : Call Internal Checkout Operation
                var command = _mapper.Map<CheckoutOrderCommand>(cartCheckoutEvent);
                var result = await _mediator.Send(command);
            }
        }

        public void Disconnect()
        {
            _connection.Dispose();
        }

    }
}