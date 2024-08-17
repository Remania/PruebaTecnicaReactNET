using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaReactNET.Server.Interfaces;
using PruebaTecnicaReactNET.Server.Models;
using PruebaTecnicaReactNET.Server.Models.Requests;

namespace PruebaTecnicaReactNET.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IPasswordHasher _passwordHasher; // Asume que tienes una interfaz para encriptación de contraseñas

        public UserController(AppDbContext appDbContext, IPasswordHasher passwordHasher)
        {
            _appDbContext = appDbContext;
            _passwordHasher = passwordHasher;
        }

        // Método para obtener un usuario por su Username
        [HttpGet("{userid}")]
        public async Task<ActionResult<User>> GetByUserId(int userid)
        {
            var user = await _appDbContext.User.SingleOrDefaultAsync(u => u.Id == userid);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPut("{userid}")]
        public async Task<IActionResult> Update(int userid, [FromBody] UpdateUserRequest request)
        {
            // Validar el modelo
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Buscar al usuario
            var user = await _appDbContext.User.SingleOrDefaultAsync(u => u.Id == userid);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Actualizar los datos del usuario
            user.Name = $"{request.FirstName} {request.LastName}";
            user.Username = request.UserName;

            // Encriptar la contraseña antes de actualizarla
            user.Password = _passwordHasher.HashPassword(request.Password);

            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;

            // Guardar los cambios
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
