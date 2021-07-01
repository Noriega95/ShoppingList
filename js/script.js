// Defino variables globales
const tabla = document.querySelector("#tabla");
const PRODUCT_KEY = "Producto";

function guardarDatos() {
  // Obtengo producto
  let nombreProducto = document.querySelector("#nombreProducto").value;
  document.querySelector("#nombreProducto").value = "";
  // Obtengo cantidad
  let cantidad = document.querySelector("#cantidad").value;
  document.querySelector("#cantidad").value = "";
  // Obtengo precio
  let precio = document.querySelector("#precio").value;
  document.querySelector("#precio").value = "";
  //Creo un nuevo producto (objeto con sus 3 campos)
  let nuevoProducto = crearProducto(nombreProducto, cantidad, precio);
  // Guardo el producto en LocalStorage
  guardarProducto(nuevoProducto);
  // Creo una nueva fila en la tabla
  agregarFilaProducto(nuevoProducto);
}

/**
 * Agrega una nueva fila a la tabla con el producto.
 * @param {object} producto el producto a agregar
 */
function agregarFilaProducto(producto) {
  let numeroProducto = tabla.children.length + 1; // Obtengo numero producto
  let btn = document.createElement("input");
  btn.type = "button";
  btn.className = "btn";
  btn.value = "Eliminar";
  btn.setAttribute("class", "btn btn-danger");
  let row = document.createElement("tr");
  btn.onclick = function eliminarItem() {
    let listaDeProductos = obtenerListaDeProductos(); //Loadea la lista de Productos
    listaDeProductos.splice(row.rowIndex - 1, 1); //Borra el elemento del array
    guardarListaDeProductos(listaDeProductos); //Guardo el array en el LocalStorage
    row.remove(); //Quito la fila
    actualizarNumero();
  };
  agregarCelda(row, numeroProducto); //Agrega las celdas en orden
  agregarCelda(row, producto.nombre);
  agregarCelda(row, producto.cantidad + "u");
  agregarCelda(row, "ARS " + producto.precio);
  let buttonCell = document.createElement("td");
  buttonCell.appendChild(btn); // Agrega botón de borrado
  row.appendChild(buttonCell);
  tabla.appendChild(row); //Agrega la fila a la tabla
}

/**
 * Recorre la tabla y actualiza los números en base al índice de las filas.
 */
function actualizarNumero() {
  for (let i = 0; tabla.children.length > i; i++) {
    tabla.children[i].childNodes[0].innerHTML = i + 1;
  }
}

function eliminarTodo() {
  document.getElementById("tabla").innerHTML = "";
  localStorage.clear();
}

/**
 * Crea un producto.
 * @param {string} nombre Nombre del producto
 * @param {number} cantidad Cantidad a comprar
 * @param {number} precio Precio del producto
 */
function crearProducto(nombre, cantidad, precio) {
  return {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio,
  };
}

/**
 * Agrega una celda a la fila.
 * @param {HTMLTableRowElement} row Fila HTML a la cual se le agrega la celda
 * @param {string} content Contenido de la celda
 */
function agregarCelda(row, content) {
  let cell = document.createElement("td");
  cell.textContent = content;
  row.appendChild(cell);
}


/**
 * Loadea la lista de productos.
 */
function obtenerListaDeProductos() {
  return JSON.parse(localStorage.getItem(PRODUCT_KEY));
}

/**
 * Guarda la lista de productos.
 * @param {array} listaDeProductos Lista de productos 
 */
function guardarListaDeProductos(listaDeProductos) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(listaDeProductos));
}

/**
 * Agrega el producto a la lista del LocalStorage
 * @param {object} producto el producto a agregar
 */
function guardarProducto(producto) {
  let listaDeProductos = obtenerListaDeProductos();
  if (listaDeProductos == null) {
    guardarListaDeProductos([producto]);
  } else {
    listaDeProductos.push(producto);
    guardarListaDeProductos(listaDeProductos);
  }
}

/**
 * Obtiene la lista de productos en LocalStorage
 * y reemplaza el contenido de la tabla con los productos.
 */
function restaurar() {
  let listaDeProductos = obtenerListaDeProductos();
  if (listaDeProductos == null) {
    return;
  }
  document.getElementById("tabla").innerHTML = "";
  listaDeProductos.forEach((producto) => {
    agregarFilaProducto(producto);
  });
}

restaurar();
