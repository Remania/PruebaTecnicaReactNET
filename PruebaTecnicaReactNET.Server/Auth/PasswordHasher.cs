using BCrypt.Net;
using PruebaTecnicaReactNET.Server.Interfaces;

namespace PruebaTecnicaReactNET.Server.Auth
{
    public class PasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            // Genera un hash para la contraseña utilizando bcrypt
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            // Verifica si la contraseña proporcionada coincide con el hash
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }
    }
}
