const productos = [
    { 
        id: 1, nombre:"Pizza Muzzarella", precio: 11500, cantidad: 1
    }, 

    { 
        id: 2, nombre:"Pizza Napolitana", precio: 12500, cantidad: 1
    }, 
    
    { 
        id: 3,nombre:"Pizza Cuatro quesos", precio: 14500, cantidad: 1
    }, 

    { 
        id: 4, nombre:"Pizza Jamon y morron", precio: 13500, cantidad: 1
    }, 

    { 
        id: 5, nombre:"Empanada de Jamon y queso", precio: 2500, cantidad: 1 
    }, 
    { 
        id: 6, nombre:"Empanada de Capresse", precio: 2500, cantidad: 1 
    },
    { 
        id: 7, nombre:"Empanada de Calabaza y queso", precio: 2500, cantidad: 1
    }, 
    { 
        id: 8, nombre:"Empanada Panceta y ciruela", precio: 2500, cantidad: 1 
    },  
];

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productContainer = document.getElementById("product-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <h4>$${producto.precio}</h4>
                         <div>
                         <button class="restar">-</button>
                         <span class="cantidad">1</span>
                         <button class="sumar">+</button>
                        </div> 
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`;
        productContainer.appendChild(card);


        let cantidad = 1;
        
        const btnSumar = card.querySelector(".sumar");
        const btnRestar = card.querySelector(".restar");
        const cantidadSpan = card.querySelector(".cantidad");

        btnSumar.onclick = () => {
            cantidad++;
            cantidadSpan.textContent = cantidad;
        };
        btnRestar.onclick = () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadSpan.textContent = cantidad;
            }
        }

    });

}

renderProductos(productos);
agregarAlCarrito();


function agregarAlCarrito () {
    const addButton = document.querySelectorAll(".productoAgregar");
    
    addButton.forEach(button => {
        button.onclick = (e) => {
            cartProducts = JSON.parse(localStorage.getItem("cartProducts"))|| [];
            const productId = e.currentTarget.id;

            const productoExistente = cartProducts.find(p => p.id == productId);

            if (productoExistente) {
                productoExistente.cantidad = productoExistente.cantidad + 1;
            }
            else {
                const seleccionado = productos.find(p => p.id == productId);

                const productoNuevo = {
                    id: seleccionado.id,
                    nombre: seleccionado.nombre,
                    precio: seleccionado.precio,
                    cantidad: 1
                };
                  
                cartProducts.push(productoNuevo);
 
            };

          

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        };

    });
};







