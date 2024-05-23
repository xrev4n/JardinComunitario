$(document).ready(function() {
    // Cargar carrito desde el localStorage al iniciar
    loadCart();

    $(document).off('click', '.add-to-cart').on('click', '.add-to-cart', function() {
      // Obtener la información del producto desde la tarjeta
      let productCard = $(this).closest('.card');
      let productName = productCard.find('.card-title').text();
      let productPrice = productCard.find('.card-price').text().replace('Precio: $', '').replace(/\./g, '');
      
      // Obtener los datos del carrito del localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Verificar si el producto ya está en el carrito
      let existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
      }

      // Guardar carrito en el localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Actualizar la tabla del carrito
      updateCartTable();
  
      // Abrir el modal del carrito
      $('#cartModal').modal('show');
    });

    // Función para actualizar la tabla del carrito
    function updateCartTable() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let cartItems = '';
      let total = 0;

      cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems += `
          <tr>
            <td>${item.name}</td>
            <td>${formatPrice(item.price)}</td>
            <td>
              ${item.quantity}
              <button class="btn btn-sm btn-success change-quantity" data-name="${item.name}" data-change="-1">-</button>
              <button class="btn btn-sm btn-success change-quantity" data-name="${item.name}" data-change="1">+</button>
            </td>
            <td>${formatPrice(itemTotal)}</td>
          </tr>
        `;
      });

      $('#cartItems').html(cartItems);
      $('#cartTotal').text(formatPrice(total));
    }

    // Función para formatear el precio con puntos como separadores de miles
    function formatPrice(price) {
      return '$' + price.toLocaleString('es-CL', { minimumFractionDigits: 0 });
    }

    // Cambiar la cantidad de un producto en el carrito
    $(document).off('click', '.change-quantity').on('click', '.change-quantity', function() {
      let productName = $(this).data('name');
      let change = parseInt($(this).data('change'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      let product = cart.find(item => item.name === productName);
      console.log(change);
      if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
          cart = cart.filter(item => item.name !== productName);
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTable();
    });

    // Cargar y mostrar carrito desde el localStorage al abrir el modal
    $('#cartIcon').click(function() {
      updateCartTable();
    });

    // Cargar carrito desde el localStorage al iniciar la página
    function loadCart() {
      updateCartTable();
    }
});
