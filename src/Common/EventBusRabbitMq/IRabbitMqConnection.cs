using System;
using RabbitMQ.Client;

namespace EventBusRabbitMq
{
    public interface IRabbitMqConnection:IDisposable
    {
        bool IsConnected{get;}
        bool TryConnect();
        IModel CreateModel();

    }
}
