// URL base de la API de libros
const apiUrl = 'http://localhost:8000/books';

// Obtener elementos del DOM para interactuar con ellos más fácilmente
const bookForm = document.getElementById('bookForm');  // Formulario para agregar/editar libros
const bookList = document.getElementById('bookList');  // Elemento donde se mostrará la lista de libros
const bookIdInput = document.getElementById('bookId');  // Campo oculto para el ID del libro (para ediciones)
const bookTitleInput = document.getElementById('bookTitle');  // Campo de entrada para el título del libro
const bookAuthorInput = document.getElementById('bookAuthor');  // Campo de entrada para el autor del libro
const bookNumberPagesInput = document.getElementById('bookNumberPages');  // Campo de entrada para el número de páginas
const bookPublisherInput = document.getElementById('bookPublisher');  // Campo de entrada para la editorial del libro

// Función para obtener todos los libros desde la API y mostrar en la interfaz
async function getBooks() {
  const response = await fetch(apiUrl + '/getAll');  // Hacer una solicitud GET a la API para obtener todos los libros
  const books = await response.json();  // Parsear la respuesta JSON que contiene los libros

  // Limpiar la lista de libros actual para que se pueda volver a llenar con la lista actualizada
  bookList.innerHTML = '';

  // Iterar sobre cada libro y agregarlo a la tabla
  books.forEach(book => {
    const row = document.createElement('tr');  // Crear una fila de tabla para cada libro
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.numberPages} páginas</td>
      <td>${book.publisher}</td>
      <td class="action-btn">
        <!-- Botón para editar el libro -->
        <button onclick="editBook('${book._id}')" title="Editar"><i class="fas fa-edit"></i></button>
      </td>
      <td class="action-btn">
        <!-- Botón para eliminar el libro -->
        <button onclick="deleteBook('${book._id}')" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    bookList.appendChild(row);  // Agregar la fila a la lista
  });
}

// Función para manejar la creación de un nuevo libro o la actualización de un libro existente
bookForm.addEventListener('submit', async (event) => {
  event.preventDefault();  // Prevenir que el formulario haga un submit tradicional y recargue la página

  // Crear un objeto `book` con los valores actuales de los campos del formulario
  const book = {
    title: bookTitleInput.value,
    author: bookAuthorInput.value,
    numberPages: bookNumberPagesInput.value ? Number(bookNumberPagesInput.value) : undefined,  // Usar el valor numérico de las páginas, si se proporciona
    publisher: bookPublisherInput.value || undefined  // Usar el valor de la editorial, si se proporciona
  };

  // Determinar el método HTTP: si hay un ID, es una actualización; si no, es una creación
  const method = bookIdInput.value ? 'PUT' : 'POST';
  const url = bookIdInput.value ? `${apiUrl}/update/${bookIdInput.value}` : `${apiUrl}/create`;  // URL para la creación o actualización

  // Hacer la solicitud a la API para crear o actualizar el libro
  const response = await fetch(url, {
    method: method,  // Método POST o PUT
    headers: {
      'Content-Type': 'application/json',  // Especificar que estamos enviando datos en formato JSON
    },
    body: JSON.stringify(book),  // Convertir el objeto book en una cadena JSON
  });

  const data = await response.json();  // Parsear la respuesta JSON del servidor
  if (response.ok) {
    // Si la solicitud fue exitosa, mostrar un mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.message,  // Mostrar el mensaje enviado por el servidor
    });
    clearForm();  // Limpiar el formulario después de crear/actualizar el libro
    getBooks();  // Volver a cargar la lista de libros
    submitCustomerBtn.textContent = "Guardar libro";  // Restaurar el texto del botón a su valor original
  }
});

// Función para editar un libro: muestra los datos actuales del libro en el formulario
async function editBook(id) {
  // Mostrar una alerta de confirmación usando SweetAlert
  const result = await Swal.fire({
    title: '¿Deseas editar este libro?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    // Hacer una solicitud para obtener los datos del libro que queremos editar
    const response = await fetch(`${apiUrl}/get/${id}`);
    const book = await response.json();  // Parsear la respuesta JSON con los datos del libro

    // Rellenar el formulario con los datos del libro seleccionado
    bookIdInput.value = book._id;
    bookTitleInput.value = book.title;
    bookAuthorInput.value = book.author;
    bookNumberPagesInput.value = book.numberPages || '';
    bookPublisherInput.value = book.publisher || '';
    submitCustomerBtn.textContent = "Guardar Cambios";  // Cambiar el texto del botón a "Guardar Cambios"
  }
}

// Función para eliminar un libro
async function deleteBook(id) {
  // Mostrar una alerta de confirmación antes de eliminar el libro
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
    // Hacer la solicitud DELETE para eliminar el libro
    const response = await fetch(`${apiUrl}/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();  // Parsear la respuesta del servidor

    // Mostrar un mensaje de éxito al eliminar el libro
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado!',
      text: data.message,  // Mostrar el mensaje del servidor
    });
    getBooks();  // Volver a cargar la lista de libros después de eliminar uno
  }
}

// Función para limpiar los campos del formulario
function clearForm() {
  // Limpiar los campos de entrada en el formulario
  bookIdInput.value = '';
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookNumberPagesInput.value = '';
  bookPublisherInput.value = '';
}

// Cargar los libros cuando la página se haya cargado completamente
getBooks();
