let productos = [];
const URL = "./db/data.json";

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productContainer = document.getElementById("product-container");

function obtenerProductos() {
    fetch(URL)
    .then(response => response.json())
    .then(data => { productos = data;
    renderProductos(productos);
    agregarAlCarrito();

    })
    .catch(err => console.log("hubo un error:", err))
    .finally(() => {console.log("proceso finalizado");
});

}

obtenerProductos();


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
}



