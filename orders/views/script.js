const apiUrlCustomers = 'http://localhost:8001/customer/getAll';  
const apiUrlBooks = 'http://localhost:8000/books/getAll';  
const apiUrlOrders = 'http://localhost:8002/order';  

const orderForm = document.getElementById('orderForm');
const customerIdInput = document.getElementById('customerId');
const bookIdInput = document.getElementById('bookId');
const initialDateInput = document.getElementById('initialDate');
const deliveryDateInput = document.getElementById('deliveryDate');
const orderList = document.getElementById('orderList');

async function loadClientsAndBooks() {
  try {
    // Obtener los clientes
    const responseCustomers = await fetch(apiUrlCustomers);
    if (!responseCustomers.ok) {
      throw new Error('Error al obtener clientes');
    }
    const customers = await responseCustomers.json();
    console.log('Clientes:', customers);  // Verificar los datos de clientes
    if (!customers || customers.length === 0) {
      console.log('No hay clientes disponibles');
    }

    // Llenar el select de clientes
    customers.forEach(customer => {
      const option = document.createElement('option');
      option.value = customer._id;
      option.textContent = customer.name;  // Usar el nombre del cliente
      customerIdInput.appendChild(option);
    });

    // Obtener los libros
    const responseBooks = await fetch(apiUrlBooks);
    if (!responseBooks.ok) {
      throw new Error('Error al obtener libros');
    }
    const books = await responseBooks.json();
    console.log('Libros:', books);  // Verificar los datos de libros
    if (!books || books.length === 0) {
      console.log('No hay libros disponibles');
    }

    // Llenar el select de libros
    books.forEach(book => {
      const option = document.createElement('option');
      option.value = book._id;
      option.textContent = book.title;  // Usar el título del libro
      bookIdInput.appendChild(option);
    });

  } catch (error) {
    console.error('Error al cargar los clientes o los libros:', error);
  }
}
// Función para crear una nueva orden
orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const order = {
    CustomerId: customerIdInput.value,
    BookId: bookIdInput.value,
    initialDate: initialDateInput.value,
    deliveryDate: deliveryDateInput.value,
  };

  const url = `${apiUrlOrders}/create`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();
  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.message,
    });
    clearForm();
    loadOrders();
  } else {
    alert(data.message);
  }
});

async function loadOrders() {
  const response = await fetch(`${apiUrlOrders}/getAll`);
  const orders = await response.json();

  // Limpiar la lista de órdenes
  orderList.innerHTML = '';

  // Mostrar las órdenes existentes
  for (const order of orders) {
    try {
    const customerResponse = await fetch(`http://localhost:8001/customer/get/${order.CustomerId}`);
    const customer = await customerResponse.json();
    const bookResponse = await fetch(`http://localhost:8000/books/get/${order.BookId}`);
    const book = await bookResponse.json();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const initialDate = new Date(order.initialDate).toLocaleDateString('es-ES', dateOptions);
    const deliveryDate = new Date(order.deliveryDate).toLocaleDateString('es-ES', dateOptions); 
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${book.title}</td>
      <td>${initialDate}</td>
      <td>${deliveryDate}</td>
    `;
    orderList.appendChild(row);

  } catch (error) {
    console.error('Error al obtener los detalles de la orden:', error);
  }
}
}

// Función para limpiar el formulario
function clearForm() {
  customerIdInput.value = '';
  bookIdInput.value = '';
  initialDateInput.value = '';
  deliveryDateInput.value = '';
}

// Cargar clientes, libros y órdenes al cargar la página
loadClientsAndBooks();
loadOrders();