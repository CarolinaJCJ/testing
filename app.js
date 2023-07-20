let carrito = []

leerArchivo();
actualizarCarrito()

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('shop-body')) {
        carrito = JSON.parse(localStorage.getItem('shop-body'))
         actualizarCarrito()
     }
 })

document.getElementById('btnBuscar').addEventListener('click',function(){
    let busqueda = document.getElementById('busqueda').value;
    let productos = getProductos();
    let filtro_producto = productos.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    if (filtro_producto.length === 0 || filtro_producto === undefined) {
        alert('Producto no encontrado');
    } else {

        let contenidoHtml = '';
        filtro_producto.forEach((p) => {
            contenidoHtml += `<div id="caja_${p.id}" class="caja-producto">`;
            contenidoHtml += `<div class="product-image"><img src="${p.img}" alt="image" /></div>`;
            contenidoHtml += `<div class="product-title">${p.nombre}</div>`;
            contenidoHtml += `<div class="product-description">${p.desc}</div>`;
            contenidoHtml += `<div class="product-price">${formatMoney(p.precio)}</div>`;
            contenidoHtml += `<div class="product-button"><div class="btn-agregar">Agregar al carrito</div></div>`;
            contenidoHtml += `</div>`;
        });

        document.getElementsByClassName('shop-body')[0].innerHTML = contenidoHtml;

        let els = document.getElementsByClassName('btn-agregar')
        Array.from(els).forEach((el) => {
            el.addEventListener('click',function(){
                swal.fire({ icon: "success", title: "Exito!", text: "Se agrego al carrito" })
            });
        });
    }

});
///

const respuesta = (productos) => {
    const existe = carrito.some((prod) => prod.id === productos);
  
    if (existe) {
      carrito.forEach((prod) => {
        if (prod.id === productos) {
          prod.cantidad++;
        }
      });
    } else {
      const item = getProductos().find((prod) => prod.id === productos);
      carrito.push({ ...item, cantidad: 1 }); // Add a new property 'cantidad' with value 1
    }
  
    localStorage.setItem('shop-body', JSON.stringify(carrito));
    actualizarCarrito(); // Call the function to update the cart visualization
  };
  

let compras = document.getElementById("boton-carrito")
compras.addEventListener("click", respuesta)

//
function cargarProductosEnLaPagina(){

    let productos = getProductos();
    let contenidoHtml = '';
    productos.forEach(p => {
        //JSON.stringify(p,null,2)
        contenidoHtml += `<div id="caja_${p.id}" class="caja-producto">`;
        contenidoHtml += `<div class="product-image"><img src="${p.img}" alt="image" /></div>`;
        contenidoHtml += `<div class="product-title">${p.nombre}</div>`;
        contenidoHtml += `<div class="product-description">${p.desc}</div>`;
        contenidoHtml += `<div class="product-price">${formatMoney(p.precio)}</div>`;
        contenidoHtml += `<div class="product-button"><div class="btn-agregar">Agregar al carrito</div></div>`;
        contenidoHtml += `</div>`;
    });

    document.getElementsByClassName('shop-body')[0].innerHTML = contenidoHtml;

    let els = document.getElementsByClassName('btn-agregar')
    Array.from(els).forEach((el) => {
        el.addEventListener('click',function(){
            
            swal.fire({ icon: "success", title: "Exito!", text: "Se agrego al carrito" })
        });
    });

}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
function getProductos(){
    return JSON.parse(localStorage.getItem('basedatos'));
}

function leerArchivo(){
    //Busqueda
            fetch('./data.json')
      .then(response => response.json())
      .then(data => {
      
        localStorage.setItem('basedatos', JSON.stringify(data));
        cargarProductosEnLaPagina();
       
      })
      .catch(error => {
       
        console.error('Error al cargar el archivo JSON:', error);
      });
     
}

function actualizarCarrito() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItemCount = document.querySelector('.cart-item-count');
  
    if (carrito.length === 0) {
      // Empty cart, so clear the cart visualization
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      // Build the HTML to display the cart items
      let contenidoHtml = '';
      carrito.forEach((item) => {
        contenidoHtml += `<div class="cart-item">`;
        contenidoHtml += `<img src="${item.img}" alt="image" class="cart-item-image" />`;
        contenidoHtml += `<div class="cart-item-details">`;
        contenidoHtml += `<p class="cart-item-title">${item.nombre}</p>`;
        contenidoHtml += `<p class="cart-item-price">${formatMoney(item.precio)}</p>`;
        contenidoHtml += `<p class="cart-item-quantity">Cantidad: ${item.cantidad}</p>`;
        contenidoHtml += `</div>`;
        contenidoHtml += `</div>`;
      });
  
      // Update the cart visualization
      cartItemsContainer.innerHTML = contenidoHtml;
  
      // Update the cart item count in the cart icon
      cartItemCount.textContent = carrito.length;
    }
  }
  
  function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('shop-body');
    actualizarCarrito(); // Call the function to update the cart visualization
  }

Swal.fire({
    title: 'Bienvenido!',
    text: '',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnh3Ynl1MjYzczJhNmowcWxkcDJwZnZieWo0bzd0NXA0d3Yyd3lycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4AlRnuga8EJOM/giphy.gif',
    imageWidth: 200,
    imageHeight: 300,
    imageAlt: 'Custom image',
  })