const apiUrl = 'http://localhost:8001/customer'; 

const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');
const customerIdInput = document.getElementById('customerId');
const customerNameInput = document.getElementById('customerName');
const customerAgeInput = document.getElementById('customerAge');
const customerAddressInput = document.getElementById('customerAddress');

// Función para obtener todos los clientes y mostrarlos en la lista
async function getCustomers() {
  try{ 
  const response = await fetch(apiUrl + '/getAll');
  const customers = await response.json();
  const clientTableBody = document.getElementById('clientTableBody');
  clientTableBody.innerHTML = '';

  // Agregar los clientes a la lista
  customers.forEach(customer => {
    const row = document.createElement('tr');

    // Crear celdas para cada dato del cliente
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.age}</td>
      <td>${customer.address}</td>
      <td class="action-btn">
        <button onclick="editCustomer('${customer._id}')" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
      </td>
      <td class="action-btn">
        <button onclick="deleteCustomer('${customer._id}')" title="Eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;

    clientTableBody.appendChild(row);
  });
} catch (error) {
  console.error('Error al cargar los clientes:', error);
}
}

// Función para crear o actualizar un cliente
customerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const customer = {
    name: customerNameInput.value,
    age: customerAgeInput.value ? Number(customerAgeInput.value) : undefined,
    address: customerAddressInput.value || undefined
  };

  const method = customerIdInput.value ? 'PUT' : 'POST';
  const url = customerIdInput.value ? `${apiUrl}/update/${customerIdInput.value}` : `${apiUrl}/create`;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();
  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.message,
    });

  clearForm();
  getCustomers();
  submitCustomerBtn.textContent = "Guardar Cliente";
}

});

// Función para editar un cliente
async function editCustomer(id) {
  const result = await Swal.fire({
    title: '¿Deseas editar este libro?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
  const response = await fetch(`${apiUrl}/get/${id}`);
  const customer = await response.json();

  customerIdInput.value = customer._id;
  customerNameInput.value = customer.name;
  customerAgeInput.value = customer.age;
  customerAddressInput.value = customer.address;
  submitCustomerBtn.textContent = "Guardar cambios";
}
}

// Función para eliminar un cliente
async function deleteCustomer(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
  const response = await fetch(`${apiUrl}/remove/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  Swal.fire({
    icon: 'success',
    title: '¡Eliminado!',
    text: data.message,
  });
  getCustomers();
}}

// Limpiar el formulario
function clearForm() {
  customerIdInput.value = '';
  customerNameInput.value = '';
  customerAgeInput.value = '';
  customerAddressInput.value = '';
}

// Cargar los clientes al cargar la página
getCustomers();