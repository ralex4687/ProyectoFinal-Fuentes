let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let cartSection = document.getElementById("cart-section");

function renderCarrito (cartItems){
    cartSection.innerHTML = "";

    if(cartItems.length === 0){
        cartSection.innerHTML = "<h2>No has seleccionado ninguna producto</h2>";
        calcularTotal(cartItems);
        return;

    }


    cartItems.forEach((producto, index) => {
        const card = document.createElement("div");
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <h4>Precio: $${producto.precio}</h4>
                          <div>
                          <button class="restar">-</button>
                          <span>${producto.cantidad}</span>
                          <button class="sumar">+</button>
                          </div>
                          <p>Subtotal: $${producto.precio * producto.cantidad}</p>`;
                                              

        cartSection.appendChild(card);

        const btnSumar = card.querySelector(".sumar");
        const btnRestar = card.querySelector(".restar");

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
        
    });
    
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