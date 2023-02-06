# Scraper-api Test

Este proyecto consiste en el desarrollo de una API REST con un sistema de usuarios y un scraper para la página de Upsocl. La API incluye endpoints para crear y actualizar usuarios, ver el listado de usuarios y iniciar sesión con JWT. Además, se ha implementado un scraper para obtener los artículos de las categorías "Inspiración" y "Verde". Estos artículos son almacenados en la base de datos y se pueden consultar a través de un endpoint con la opción de filtrado por categoría y autor.

Como desarrollador, me aseguré de que los campos del formulario estuvieran correctamente validados y que los usuarios estuvieran relacionados con los posts como autor, permitiendo que un usuario pueda tener muchos posts. Además, el proyecto utiliza la arquitectura REST para retornar mensajes de éxito o error según el resultado de la petición.

En general, el proyecto se ha llevado a cabo con éxito y cumple con los criterios de aceptación establecidos.

## Caracteristicas del proyecto:

1. El proyecto fue construido utilizando Node.js y Express como frameworks principales.
2. Para asegurarnos de tener una estructura y formato coherente en el código, se implementó ESLint junto con Prettier.
3. Para la gestión de usuarios y autenticación, se utilizó JSON Web Tokens (JWT). También se implementó un scraper para recopilar información desde una fuente externa.
4. Los datos recopilados y los detalles de usuario se almacenaron en una base de datos MongoDB.

## End points:

El prefijo "/api/v1" se utiliza para identificar la versión de la API que estás utilizando. Es una buena práctica incluir la versión en la ruta para que, en caso de realizar cambios importantes en la API en el futuro, se pueda mantener la compatibilidad con versiones anteriores.

Cada ruta requiere del envio de un token bearer en el header para validar su usuario, puede obtener este token al iniciar sesion en la ruta de login

### Usuarios

> /users

**Method:** _GET_

**Authentication:** _Bearer_

Esta ruta le permitirá acceder a la información de todos los usuarios, excepto la contraseña por motivos de seguridad.

> /users/account

**Method:** _GET_

**Authentication:** _Bearer_

Esta ruta le permitirá acceder a la información del usuario asociado con el token recibido como “Bearer”, excepto la contraseña por motivos de seguridad.

> /users/edit

**Method:** _PATCH_

**Authentication:** _Bearer_

**Body:**

```jsx
{
	"username": "newUserName"
}
```

Esta ruta le permitirá modificar los campos del usuario, incluyendo el nombre de usuario, el correo electrónico y la contraseña, simplemente agregue o modifique los campos que desee cambiar.

> /users/login

**Method:** _POST_

**Body:**

```jsx
{
	"username": "testUser",
	"password": "123456789"
}
```

Esta ruta le permitirá obtener el token de autenticación necesario para incluirlo en el campo "Bearer" y autenticar su solicitud.

> /users/register

**Method:** _POST_

**Body:**

```jsx
{
	"username": "newUser",
	"email": "newUser@example.com",
	"password": "123456789"
}
```

Esta ruta le permitirá crear una cuenta de usuario para acceder a la API. Será necesario proporcionar información como nombre de usuario, correo electrónico y contraseña para completar el registro.

### Scraper

> /scraper

**Method:** _POST_

**Authentication:** _Bearer_

**Body:**

```jsx
{
	"category": "inspiracion" ó "verde",
	"items": 3
}
```

Esta ruta requiere que se proporcione un cuerpo en formato JSON con los siguientes campos:

- **`category`**: Ingrese en este campo la categoría de la página web de la cual desea extraer la información, puede ser "inspiración" o "verde".
- **`items`**: Ingrese la cantidad de artículos en la página web que desea extraer.

Si los artículos ya están almacenados en la base de datos, se le retornará una advertencia y se guardarán solo los artículos que aún no estén almacenados.

### Articles

> /articles

**Method:** _GET_

**Authentication:** _Bearer_

Este endpoint retornará todos los artículos almacenados en la base de datos.

> /articles/filter

**Method:** _GET_

**Authentication:** _Bearer_

**Query:** _category, scrapingBy, author_

**URL:**

```
http://localhost:3003/api/v1/articles/filter?scrapingBy=testUser
```

Através de “Query Params”, puede tener acceso a los artículos que desee. Los siguientes son los parámetros de filtro disponibles:

- **`scrapedBy`**: Este parámetro recibe el nombre de usuario de la persona que realizó el scraping.
- **`author`**: Este parámetro hace referencia a la persona que escribió el artículo del cual se obtuvo la información.
- **`category`**: Este parámetro se refiere a una de las categorías asociadas al artículo extraído.

> /articles/delete

**Method:** _DELETE_

**Authentication:** _Bearer_

Este endpoint eliminará todos los artículos almacenados en la base de datos de el usuario que este realizando la peticion con su repectivo token de acceso.

> /articles/delete/:{deleteId}

**Method:** _DELETE_

**Authentication:** _Bearer_

**Params:**

```
http://localhost:3003/api/v1/articles/delete/63e058b7b9c37439c07ea1d8
```

través de un parámetro de consulta, puede eliminar un artículo que coincida con el **`id`** especificado. Especifique el **`id`** como una variable en la ruta, como se muestra en el ejemplo anterior.

## Correr en local

Para correr este proyecto, siga los siguientes pasos:

1. Clone este repositorio en su equipo utilizando el siguiente comando en su terminal: **`git clone https://github.com/JapCode/scraper-test.git`**
2. Una vez completado, ingrese a la carpeta creada: **`cd scraper-test`**
3. Instale todas las dependencias necesarias ejecutando el siguiente comando: **`npm i`**
4. Cree un nuevo archivo en la ruta base del proyecto llamado **`.env`**.
5. dentro de este archivo requerira de las siguientes valiables de entorno:

   ```
   PORT="3003" //puerto en donde correra el servidor
   MONGO_DB_URI="mongodbUri" //igrese una uri que le permita conectarse a una base de datos en mongo
   SECRET_JWT="tokenSecretExample" //ingrese el secreto que sera usado para la creacion del jsonwebtoken
   BASE_URL_SCRAPING="https://www.upsocl.com/" //url base de la cual se extraera la informacion con el scraper
   TOKEN_EXPIRATION="15m" //tiempo de expiracion para los jsonwebtokens en el formato que dese
   ```

6. Finalmente, ejecute el proyecto con el comando **`npm run start:dev`**. Esto ejecutará nodemon, que mantendrá el servidor corriendo continuamente en un entorno local.
