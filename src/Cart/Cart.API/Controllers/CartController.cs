using System.Net;
using System.Threading.Tasks;
using Cart.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cart.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepo _repo;
        public CartController(ICartRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Entities.Cart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Cart>> GetCart(string userName){
            return Ok(await _repo.GrtCart(userName)?? new Entities.Cart(userName));
        }

        [HttpPost]
        [ProducesResponseType(typeof(Entities.Cart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Cart>> UpdateCart([FromBody] Entities.Cart cart){
            return Ok(await _repo.UpdateCart(cart));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DelteCart([FromQuery] string userName){
            return Ok(await _repo.DelteCart(userName));
        }
    }
}