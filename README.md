# Prueba Tecnica React y NET

Este proyecto es una aplicación para el puesto de Desarrollador Web React en la empresa Wayni - Tech & People.

## Descripción del Proyecto

Este proyecto proporciona una interfaz para gestionar los datos del usuario. Incluye funcionalidades para actualizar la información personal del usuario y cambiar la contraseña.

## Páginas del Proyecto

### Profile Setting

La página **Profile Setting** muestra la información del usuario, como nombre, nombre de usuario, correo electrónico y número de teléfono. Los usuarios pueden visualizar sus detalles personales pero no editarlos desde esta página.

### Name

La página **Name** permite a los usuarios actualizar su nombre. Los usuarios pueden ingresar un nuevo nombre, que se divide en nombre y apellido. Luego, pueden guardarlo en la base de datos. Si el campo del nombre está vacío, se mostrará un mensaje de error.

### Username

La página **Username** permite a los usuarios actualizar su nombre de usuario. Los usuarios pueden ingresar un nuevo nombre de usuario y guardarlo en la base de datos. Si el nombre de usuario no se proporciona, se mostrará un mensaje de error.

### Change Password

La página **Change Password** permite a los usuarios ver su contraseña actual y actualizarla. Los usuarios deben ingresar su contraseña actual, una nueva contraseña y confirmar la nueva contraseña. La contraseña nueva debe cumplir con ciertos requisitos de seguridad. Si la nueva contraseña no cumple con los requisitos o no coincide con la confirmación, se mostrará un mensaje de error.

## Configuración del Entorno

1. **Clonar el Repositorio en Visual Studio**:
  git clone https://github.com/Remania/PruebaTecnicaReactNET.git

2. **Iniciar el proyecto con el botón Iniciar o https**

3. **Ingresar a las siguientes URLs**
  Frontend React: https://localhost:5173/
  Backend API Swagger: https://localhost:7082/swagger/index.html

4. **Para hacer pruebas en Swagger, utilizar el userId: 1**

## Uso del Proyecto
1. Navegar a la página de Profile Setting para visualizar la información personal del usuario.
2. Actualizar su nombre en la página Name.
3. Cambiar su nombre de usuario en la página Username.
4. Cambiar su contraseña en la página Change Password.

## Requisitos del Sistema
Frontend: React 18+, Bootstrap.
Backend: .NET Core 8, SQL Server.
Base de Datos: SQL Server con una tabla User para almacenar la información del usuario.

## Comando SQL SERVER
-- Crear la base de datos <br>
CREATE DATABASE PruebaTecnicaReactNET; <br>
GO <br>

-- Seleccionar la base de datos <br>
USE PruebaTecnicaReactNET; <br>
GO <br>

-- Crear la tabla dbo.User <br>
CREATE TABLE dbo.[User] ( <br>
    Id INT IDENTITY(1,1) PRIMARY KEY, <br>
    Name NVARCHAR(100), <br>
    Username NVARCHAR(50) UNIQUE, <br>
    Password NVARCHAR(255), <br>
    Email NVARCHAR(100), <br>
    PhoneNumber NVARCHAR(20) <br>
); <br>
GO <br>

-- Insertar un registro de ejemplo <br>
INSERT INTO dbo.[User] (Name, Username, Password, Email, PhoneNumber) <br>
VALUES ('Juan Pérez', 'juanperez', 'ContraseñaSegura123!', 'juan.perez@example.com', '1234567890'); <br>
GO <br>
