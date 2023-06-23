BigBuy monedero
Para hacer funcionar la aplicacion copiar la carpeta y ejecutar npm i.
Luego levantar el json en el server ejecutando json-server --watch data.json verificar el puerto para que coincida con la url del fetch.
Para hacer el fetch del archivo.json use una base de datos fake para ser consumida desde la api.

En cuanto al stack utiliza vite, react y Material UI como ui-framework.

El aspecto visual se puede mejorar pero por razones de tiempo no pudo ser terminada, al igual que la api sea responsive.
En cuanto a las buenas practicas uso eslint y prettier.
En cuanto al testing use React Testing Library para los distintos componentes.
En cuanto a lo que me dió mas dificultad fue el filtrado por fecha.

Se podria mejorar:
Usando un state global
Guardando los datos en localStorage
Mejorando el aspecto visual para pantallas pequeñas.
