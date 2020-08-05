using Cart.API.Data;
using Cart.API.Data.Interfaces;
using Cart.API.Repositories;
using Cart.API.Repositories.Interfaces;
using EventBusRabbitMq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using StackExchange.Redis;
using AutoMapper;
using EventBusRabbitMq.Producer;
using Microsoft.OpenApi.Models;

namespace Cart.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton<ConnectionMultiplexer>(sp=>{
                var config=ConfigurationOptions.Parse(Configuration.GetConnectionString("Redis"),true);
                return ConnectionMultiplexer.Connect(config);
            });
            services.AddScoped<ICartContext,CartContext>();
            services.AddScoped<ICartRepo,CartRepo>();
            services.AddAutoMapper(typeof(Startup));

            services.AddSingleton<IRabbitMqConnection>(sp=>{
                 var factory=new ConnectionFactory(){
                     HostName=Configuration["EventBus:HostName"]
                 };
                 if(!string.IsNullOrEmpty(Configuration["EventBus:UserName"])){
                     factory.UserName=Configuration["EventBus:UserName"];
                 }
                 if(!string.IsNullOrEmpty(Configuration["EventBus:Password"])){

                     factory.Password=Configuration["EventBus:Password"];
                 }
                 return new RabbitMqConnection(factory);
             });
            
            services.AddSingleton<EventBusRabbitMqProducer>();

            //Swagger Dependencies
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "Cart API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
               c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cart API v1");
            });
        }
    }
}
