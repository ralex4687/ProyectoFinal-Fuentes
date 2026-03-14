const productos = [
    { id: 1, nombre:"Pizza Muzzarella", precio: 11500, imagen:"img/pizza-muzarella.webp" },

    { id: 2, nombre:"Pizza Napolitana", precio: 12500, imagen:"img/pizza-napo.webp" },
    { id: 3,nombre:"Pizza Cuatro quesos", precio: 14500, imagen:"img/pizza-cuatroqueso.webp" },
    { id: 4, nombre:"Pizza Jamon y morron", precio: 13500, imagen:"img/pizza-jamonymorron.webp" },
    { id: 5, nombre:"Empanada de Jamon y queso", precio: 2500, imagen:"img/empanada-jyq.webp" },
    { id: 6, nombre:"Empanada de Capresse", precio: 2500, imagen:"img/empanada-caprese.webp" },
    { id: 7, nombre:"Empanada de Calabaza", precio: 2500, imagen:"img/empanada-calabaza.webp" },
    { id: 8, nombre:"Empanada Panceta y ciruela", precio: 2500, imagen:"img/empanada-panceta.webp" },
];

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productContainer = document.getElementById("product-container")

function renderProductos(productsArray) {
    productContainer.innerHTML = "";

    productsArray.forEach(producto => {
        const card = document.createElement("div")
        
        card.innerHTML = `
            <div class="producto-img">
            <img src="${producto.imagen}">
            </div>
            <div class="card-body">
                 <h3>${producto.nombre}</h3>
                 <h4>$${producto.precio}</h4>
                 <div class="cantidad-container">
                 <button class="restar">-</button>
                 <span class="cantidad">1</span>
                 <button class="sumar">+</button>
                 </div>
                 <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
                 </div>`;
        
                          productContainer.appendChild(card);


        let cantidadLocal = 1;
        
        const btnSumar = card.querySelector(".sumar");
        const btnRestar = card.querySelector(".restar");
        const cantidadSpan = card.querySelector(".cantidad");

        btnSumar.onclick = () => {
            cantidadLocal++;
            cantidadSpan.textContent = cantidadLocal;
        };
        btnRestar.onclick = () => {
            if (cantidadLocal > 1) {
                cantidadLocal--;
                cantidadSpan.textContent = cantidadLocal;
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
            const card = e.currentTarget.parentElement;
            
            const cantidadElegida = parseInt(card.querySelector(".cantidad").textContent);

            const productoExistente = cartProducts.find(p => p.id == productId);

            if (productoExistente) {
                productoExistente.cantidad = productoExistente.cantidad + cantidadElegida;
            }
            else {
                const seleccionado = productos.find(p => p.id == productId);

                const productoNuevo = {
                    id: seleccionado.id,
                    nombre: seleccionado.nombre,
                    precio: seleccionado.precio,
                    imagen: seleccionado.imagen,
                    cantidad: cantidadElegida
                };
                  
                cartProducts.push(productoNuevo);
 
            };

          

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));


            card.querySelector(".cantidad").textContent = 1;
        };

    });
};







