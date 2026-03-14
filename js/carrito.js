let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let cartSection = document.getElementById("cart-section");

function renderCarrito (cartItems){
    cartSection.innerHTML = "";

    if(cartItems.length === 0){
        cartSection.innerHTML = "<h2>No has seleccionado ninguna producto</h2>";
        calcularTotal(cartItems);
        return;
    }

    const listaContenedor = document.createElement("div");
    listaContenedor.className = "carrito-lista-filas";

    cartItems.forEach((producto, index) => {
        const fila = document.createElement("div");
        fila.className = "item-carrito-lista";

        fila.innerHTML = `<div class="info-producto">
                          <span class="nombre">${producto.nombre}</span>
                          <span class="precio">$${producto.precio}</span>
                          </div>
                          <div class="cantidad-container">
                          <button class="restar">-</button>
                          <span class="cantidad">${producto.cantidad}</span>
                          <button class="sumar">+</button>
                          </div>
                          <div class="subtotal">
                          <span>Subtotal: $${producto.precio * producto.cantidad}</span>
                          <button class="eliminar-item">🗑️</button>
                          </div>`;

        listaContenedor.appendChild(fila);

        const btnSumar = fila.querySelector(".sumar");
        const btnRestar = fila.querySelector(".restar");
        const btnEliminar = fila.querySelector(".eliminar-item");

        btnSumar.onclick = () => {
            producto.cantidad++;
            actualizarCarrito();
        };

        btnRestar.onclick = () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                cartProducts.splice(index, 1);
            }
            actualizarCarrito();
        };

        btnEliminar.onclick = () => {
            cartProducts.splice(index, 1);
            actualizarCarrito();
        };
        
    });

    cartSection.appendChild(listaContenedor);
    calcularTotal(cartItems);
}

function calcularTotal(cartItems) {
    const total = cartItems.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    const totalElemento = document.getElementById("total-carrito");
    
    if (cartItems.length === 0) {
        totalElemento.innerHTML = '<p>Total: $0</p>';
    } else {
        totalElemento.innerHTML = `
            <p>Total: $${total}</p>
            <button id="vaciar-carrito">Vaciar Carrito</button>
            <button id="finalizar-compra">Finalizar Compra</button>
        `;

        document.getElementById("vaciar-carrito").onclick = () => {
            cartProducts = [];
            actualizarCarrito();
        };

        document.getElementById("finalizar-compra").onclick = mostrarRecibo;
    }
}

function actualizarCarrito() {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderCarrito(cartProducts);
}

function mostrarRecibo() {
    const totalFinal = cartProducts.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);

    let detalleHTML = `<div style="text-align: left;">
        <p><strong>Productos:</strong></p>
        <ul style="list-style: none; padding: 0;">`;
        

    cartProducts.forEach(producto => {
        detalleHTML += `<li>${producto.nombre} (x${producto.cantidad}) - $${producto.precio * producto.cantidad}</li>`;
    });

    detalleHTML += `</ul><br>
        <p><strong>Total a pagar: $${totalFinal}</strong></p>
        <hr>
        <p>Complete sus datos de envío:</p>
        <input id ="nombre-cliente" class="swal2-input" placeholder="Nombre Completo">
        <input id="direccion-cliente" class="swal2-input" placeholder="Dirección de Envío">
    </div>`;

    Swal.fire({
        title: "Desea confirmar su Pedido?",
        html: detalleHTML,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#99b898",
        cancelButtonColor: "#ff847c",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            const nombreCliente = document.getElementById("nombre-cliente").value;
            const direccionCliente = document.getElementById("direccion-cliente").value;

            if (!nombreCliente || !direccionCliente) {
                Swal.showValidationMessage("Por favor complete todos los campos");
                return false;
            }
            return { nombre: nombreCliente, direccion: direccionCliente };
  }

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Compra Realizada!",
                text: "Gracias por tu compra.",
                icon: "success",
                confirmButtonColor: "#99b898"
            });

             cartProducts = [];
             actualizarCarrito();
        }

    });

 
}

renderCarrito(cartProducts);