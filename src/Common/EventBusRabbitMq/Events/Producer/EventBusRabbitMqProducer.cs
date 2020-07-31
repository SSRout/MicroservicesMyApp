using System;
using System.Text;
using System.Text.Json;
using EventBusRabbitMq.Events;
using RabbitMQ.Client;

namespace EventBusRabbitMq.Producer
{
    public class EventBusRabbitMqProducer
    {
        private readonly IRabbitMqConnection _connection;
        public EventBusRabbitMqProducer(IRabbitMqConnection connection)
        {
            _connection = connection;
        }

        public void PublishCartCheckpout(string queueName,CartCheckoutEvent publishModel){
            using(var channel=_connection.CreateModel()){
                channel.QueueDeclare(queueName,durable:false,exclusive:false,autoDelete:false,arguments:null);
                var message=JsonSerializer.Serialize(publishModel);
                var body=Encoding.UTF8.GetBytes(message);

                IBasicProperties properties=channel.CreateBasicProperties();
                properties.Persistent=true;
                properties.DeliveryMode=2;

                channel.ConfirmSelect();
                channel.BasicPublish(exchange:"",routingKey:queueName,mandatory:true,basicProperties:properties,body:body);
                channel.WaitForConfirmsOrDie();

                channel.BasicAcks+=(sender,eveentArgs)=>{
                    Console.WriteLine("sent RabbitMq");

                };
                channel.ConfirmSelect();
            }
        }
    }
}