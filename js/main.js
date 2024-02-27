//1) DECLARACIONES 
///1.1) VARIABLES GLOBALES
let total = 0;
let totalCompra = 0; 
let interes = 0.05;
let nombre = "Eugenia";

//1.2) ARRAYS
//1.2.1) ARRAY PARA ALMACENAR LOS PRODUCTOS SELECCIONADOS POR EL USUARIO (CARRITO)
let carrito = [];
//1.2.3) ARRAY DE NUESTROS PRODUCTOS
const catalogo = [];
//1.2.3.1) FUNCIÓN CONSTRUCTORA PARA LOS PRODUCTOS DEL ARRAY 'CATALOGO'
function Imagenes(personaje, precio, stock, ubicacion){
    this.personaje=personaje;
    this.precio=precio;
    this.stock=stock;
    this.ubicacion=ubicacion;
    //Método para agregar las imágenes creadas directamente al array
    catalogo.push(this);
 }
 
 //1.2.3.2) INSTANCIACIÓN DE LOS PRODUCTOS DEL CATÁLOGO
const bernini = new Imagenes(
    "Gian Lorenzo Bernini",
    100.00,
    5,
    "bernini.jpg"
);

const copernicus = new Imagenes(
    "Nicolaus Copernicus",
    100.00,
    5,
    "copernicus.jpg"
);
 
const gauss = new Imagenes(
    "Carl Friedrich Gauss",
    100.00,
    5,
    "gaus.jpg"
);
 
const hegel = new Imagenes(
    "Georg Wilhelm Friedrich Hegel",
    100.00,
    5,
    "hegel.jpg"
);

const kierkegaard = new Imagenes(
    "Søren Kierkegaard",
    100.00,
    5,
    "kierkegaard.jpg"
);
 
const leibniz = new Imagenes(
    "Gottfried Wilhelm Leibniz",
    100.00,
    5,
    "leibniz.jpg"
);

const planck = new Imagenes(
    "Max Planck",
    100.00,
    5,
    "planck.jpg"
);

//2- LOG IN
//Función para loguearse e ingresar al sistema con 3 intentos
function loguear(){
    let usuario = "Euge";
    let pass = "123";
    let usuarioIngresado;
    let passIngresado;
    let intentos = 0;
    let acceso = false;
 
 while (intentos < 3 && !acceso) {
    usuarioIngresado = prompt("Por favor, ingrese su usuario");
    passIngresado = prompt("Por favor, ingrese su clave");
 
    if (usuario === usuarioIngresado && pass === passIngresado){
       acceso = true;
       alert(`Bienvenido, ${nombre}`);
       seleccionarImagenes();
    } else {
       intentos++;
       if(intentos < 3){
          alert("Usuario o contraseña incorrectos. Por favor, intente nuevamente");
       } else {
          alert("Ha superado el número máximo de intentos. Espere unos instantes y vuelva a ingresar.");
       }
    } 
 }
 }

//3) FUNCIÓN PARA MOSTRAR EL CATÁLOGO Y PERMITIR AL USUARIO SELECCIONAR PRODUCTOS
function seleccionarImagenes() {
        let muestraCatalogo = "Catálogo:\n";
        catalogo.forEach(function(imagen, index) {
            muestraCatalogo += `${index + 1}. ${imagen.personaje}, Precio: $${imagen.precio}, Stock: ${imagen.stock}\n`;
        });

        let seleccion = prompt(muestraCatalogo + '\nSeleccione el número de la imagen que desea comprar o ingrese el nombre del personaje para buscar y agregar al carrito. Para salir del programa, presione "X":');

        //3.1) Si usuario presiona "X" para salir:
        if (seleccion.toLowerCase() == "x") {
            alert("Gracias por elegirnos. ¡Hasta pronto!");
            return;
        }        
        //3.2) Si usuario elige un número de los productos del array "catálogo":
        if (seleccion > 0 && seleccion <= catalogo.length) {
            seleccion = parseInt(seleccion);
             //Seleccionar la cantidad de imágenes y agregarlos a la lista "carrito"
            let cantidad = parseInt(prompt('Ingrese la cantidad que desea comprar:'));
            if (cantidad > 0 && cantidad <= catalogo[seleccion - 1].stock) {
                let producto = catalogo[seleccion - 1];
                producto.cantidad = cantidad;
                carrito.push(producto);
            //Actualizar el stock del producto seleccionado en el array catalogo
                catalogo[seleccion - 1].stock -= cantidad; 
                seguirComprando();
            } else {
                alert('Cantidad inválida o stock insuficiente. Por favor, revise la cantidad disponible en el listado y vuelva a intentarlo.');
                seleccionarImagenes();
            }
        } else {
        //3.3) Si la selección no es un número, el usuario puede buscar por nombre del producto
        let busqueda = catalogo.filter(producto => producto.personaje.toLowerCase().includes(seleccion.toLowerCase()));
        //Búsqueda
        if (busqueda.length === 0) {
        alert(`No se encontraron productos que coincidan con "${seleccion}".`);
        seleccionarImagenes();
        } else {
            let mensajeBusqueda = 'Resultados de la búsqueda:\n';
            busqueda.forEach(function(producto, index) {
                mensajeBusqueda += `${index + 1}. ${producto.personaje}, Precio: $${producto.precio}, Stock: ${producto.stock}\n`;
            });
            //Cliente elige entre uno de los productos encontrados
            let seleccionProducto;
            do {
                seleccionProducto = prompt(mensajeBusqueda + 'Seleccione el número del producto que desea agregar al carrito:');
                if (seleccionProducto > 0 && seleccionProducto <= busqueda.length) {
                    let productoSeleccionado = busqueda[parseInt(seleccionProducto) - 1];
                    let cantidad;
                    do {
                        cantidad = parseInt(prompt(`Ingrese la cantidad de imágenes que desea comprar de ${productoSeleccionado.personaje}:`));
                        if (cantidad > 0 && cantidad <= productoSeleccionado.stock) {
                            let producto = {
                                personaje: productoSeleccionado.personaje,
                                precio: productoSeleccionado.precio,
                                ubicacion: productoSeleccionado.ubicacion,
                                stock: productoSeleccionado.stock,
                                cantidad: cantidad
                            };
                            carrito.push(producto);
                            // Actualizar el stock del producto seleccionado en el array catalogo
                            productoSeleccionado.stock -= cantidad;
                            seguirComprando();
                        } else {
                            alert('Cantidad inválida o stock insuficiente. Por favor, ingrese un número válido.');
                        }
                    } while (!(cantidad > 0 && cantidad <= productoSeleccionado.stock));
                } else {
                    alert('Selección inválida. Por favor, seleccione un número válido.');
                }
            } while (!(seleccionProducto > 0 && seleccionProducto <= busqueda.length));
        }
        }
} //Fin de la función seleccionarImagenes()

//4) FUNCIÓN PARA SEGUIR COMPRANDO (AGREGAR MÁS PRODUCTOS AL CARRITO)
function seguirComprando(){
    let respuesta=prompt(`${nombre}, ¿quiere agregar más productos a su carrito? S/N`)
    if (respuesta.toLowerCase() == "s") {
        seleccionarImagenes();
    } else if (respuesta.toLowerCase() == "n") {
        pagar();
    } else {
        alert("Presione 'S' para agregar más productos a su carrito o 'N' para continuar con el pago");
        seguirComprando();
    }
}

//5) FUNCIÓN PARA PAGAR
function pagar(){
    // 5.1) Calcular el total de la compra
    totalCompra = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    let respuesta=prompt("¿Continuar al pago? S/N");
    if (respuesta.toLowerCase() == "s") {
        let pago = prompt(`Total a pagar: $${totalCompra}. ¿Cómo va a abonar, ${nombre}? \n 1- En un pago. Presione 1 \n 2- Tarjeta de crédito en hasta 3 cuotas con un ${interes}% de recargo. Presione 2`);
    //5.1.1) Pago en cuotas interés
        if (pago === "2"){
            alert(mostrarDetalleCompra(totalCompra));
            calcularInteres();
            continuar();
    //5.1.2) 1 pago sin interés
        } else if (pago === "1"){
            alert(mostrarDetalleCompra(totalCompra));
            continuar();
           } else {
            alert("Elija una de las formas de pago ofrecidas");
            pagar();
           } 
    } else if (respuesta.toLowerCase() == "n"){
        volverSalir();
    } else {
        pagar();
    }              
}
            
//5.2) FUNCIÓN PARA MOSTRAR AL CLIENTE EL DETALLE O RESUMEN DE SU COMPRA   
function mostrarDetalleCompra(totalCompra) {
    let mensajeProductos = 'Productos seleccionados:\n';
    carrito.forEach(function(producto, index) {
        mensajeProductos += `${index + 1}. ${producto.personaje} - Cantidad: ${producto.cantidad}, Precio unitario: $${producto.precio}, Subtotal: $${producto.precio * producto.cantidad}\n`;
    });
    mensajeProductos += `Total: $${totalCompra}`;
return mensajeProductos;
}

//5.3) FUNCIÓN PARA CALCULAR INTERESES SI CLIENTE ELIGE ABONAR EN CUOTAS
const calcularInteres = () =>{
    let cuotas;
    let totalConInteres;
    let montoAabonar;
    cuotas = parseInt(prompt("Elija el número de cuotas a pagar"));
    if (cuotas<= 3){
        totalConInteres = totalCompra + (totalCompra * interes);
        montoAabonar = totalConInteres / cuotas;
        alert(`El monto de su compra es de $${totalCompra} a abonar ${cuotas} cuotas con un ${interes}% de interés. \nEl TOTAL a pagar ahora es de $${totalConInteres} en ${cuotas} cuotas de $${montoAabonar}`);
        continuar();
    } else {
        alert(`Ofrecemos hasta tres cuotas con un ${interes}% de recargo. Elija la cantidad de cuotas en las que desea abonar`)
        calcularInteres();
    }
}

//5.4) FUNCIÓN PARA CONTINUAR AL PAGO
function continuar(){
    let respuesta=prompt("¿Quiere completar la compra? S/N")
     if (respuesta.toLowerCase() == "s") {
         alert("Procesando el pago...");
         alert("¡Pago exitoso! Muchas gracias por su compra");
         volverSalir();
      } else if (respuesta.toLowerCase() == "n") {
        volverSalir();
      } else {
         continuar();
      }
 }

//6) FUNCIÓN PARA SALIR DEL PROGRAMA O VOLVER AL MENÚ
const volverSalir = () =>{
    let respuesta;
     do{
          respuesta = prompt("Para volver al menú principal, presione M. Para salir, presione S");
    } while (!(respuesta.toLowerCase() == "m" || respuesta.toLowerCase() == "s"));
        
    //Salir del programa
        if (respuesta.toLowerCase() == "s") {
            alert(`Gracias por elegirnos, ${nombre}.¡Hasta pronto!`);
            return;
    //Volver al menú principal
        } else if (respuesta.toLowerCase() == "m") {
            // Vaciar el carrito
            carrito = [];
            seleccionarImagenes();
        }
 }

//LLAMADO A LA FUNCIÓN QUE EJECUTA TODO EL PROGRAMA
loguear();
