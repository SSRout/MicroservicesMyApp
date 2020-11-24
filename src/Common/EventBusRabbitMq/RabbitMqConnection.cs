using System;
using System.Threading;
using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;

namespace EventBusRabbitMq
{
    public class RabbitMqConnection : IRabbitMqConnection
    {
        private readonly IConnectionFactory _connectionFactory;
        private IConnection _connection;
        private bool _disposed=false;
        public RabbitMqConnection(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory??throw new ArgumentNullException(nameof(connectionFactory));
            if (!IsConnected)
            {
                TryConnect();
            }
        }

        public bool IsConnected
        {
            get
            {
                return _connection != null && _connection.IsOpen && !_disposed;
            }
        }

        public bool TryConnect()
        {
            try
            {
                _connection = _connectionFactory.CreateConnection();
            }
            catch (BrokerUnreachableException)
            {
                Thread.Sleep(2000);
                _connection = _connectionFactory.CreateConnection();
            }
            catch (Exception)
            {
                throw;
            }

            return IsConnected.Equals(true) ? true : false;
        }
        public IModel CreateModel()
        {
            return IsConnected ? _connection.CreateModel() : throw new InvalidOperationException("no rabbitmq connection");
        }

        public void Dispose()
        {
            if (_disposed) return;

            try
            {
                _connection.Dispose();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}