using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Cart.API.Entities;
using Cart.API.Repositories.Interfaces;
using EventBusRabbitMq.Common;
using EventBusRabbitMq.Events;
using EventBusRabbitMq.Producer;
using Microsoft.AspNetCore.Mvc;

namespace Cart.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepo _repo;
        private readonly IMapper _mapper;
        private readonly EventBusRabbitMqProducer _eventBus;
        public CartController(ICartRepo repo, EventBusRabbitMqProducer eventBus, IMapper mapper)
        {
            _eventBus = eventBus;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Entities.Cart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Cart>> GetCart(string userName)
        {
            return Ok(await _repo.GrtCart(userName) ?? new Entities.Cart(userName));
        }

        [HttpPost]
        [ProducesResponseType(typeof(Entities.Cart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Cart>> UpdateCart([FromBody] Entities.Cart cart)
        {
            return Ok(await _repo.UpdateCart(cart));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DelteCart([FromQuery] string userName)
        {
            return Ok(await _repo.DelteCart(userName));
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Accepted)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> CartCheckout([FromBody] CheckOut checkout)
        {
            var basket = await _repo.GrtCart(checkout.UserName);
            if (basket == null) return BadRequest();

            var basketRmoved = await _repo.DelteCart(checkout.UserName);
            if (!basketRmoved) return BadRequest();

           var eventMessage = _mapper.Map<CartCheckoutEvent>(checkout);
           eventMessage.RequestId = Guid.NewGuid();
           eventMessage.TotalPrice = checkout.TotalPrice;
            try{
                _eventBus.PublishCartCheckpout(EventBusConstants.CartCheckoutQueue,eventMessage);
            }
            catch(Exception){
                throw;
            }

            return Accepted();
        }
    }
}