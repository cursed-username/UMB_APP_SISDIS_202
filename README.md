# UMB_APP_SISDIS_202

Desarrollo de una app distribuida por medio de microservicios en apache kafka

## Integrantes

- Karen Tatiana Peña Cortes.
- Juan Sebastian Amaya.
- Laura Vannesa Torres.

## Funcionalidades

1. Obtencion de datos tanto de envio como de destino para poder calcular el valor de envio.

Datos necesarios que debemos recibir:

*Pais de origen.
*Nombre completo de la persona que recibe el pedido.
*Direccion de la persona que recibe el pedido.
*Ciudad de la persona que recibe el pedido.
*Codigo postal de la persona que recibe el pedido.
*Telefono de la persona que recibe el pedido.

2. Calculo del envio dependiendo el peso y el pais de envio. para este necesitamos:

*El peso del producto.
*El pais donde llegara el envio.

3.Eleccion del tipo de envio que desea realizar la persona (envio estandar o envio rapido) por el envio rapido se le aumentara un 15% del total del costo de envio.

4. Introducir una nueva direccion si el usuario digito mal la direccion (solo podra modificar la direccion, no la ciudad, ni el pais).

5. Se informara al usuario si existe cobertura en el pais destino.

## Lenguaje

Node
