const listacompras = [];
var estado = "A";
var index_actual;

const confirmarItem = document.getElementById("confirmar"); //button
const cancelarItem = document.getElementById("cancelar"); //button

const listado = document.getElementById("tabla");
const nombre = document.getElementById("nombre");
const cantidad = document.getElementById("cantidad");
const titulo = document.getElementById("titulo-producto");

confirmarItem.addEventListener("click", confirmar_operacion);
cancelarItem.addEventListener("click",cancelar_operacion);

//sacar prelleando array
listacompras.push(["Cebollas", "1kg."]);
listacompras.push(["Papas", "2kg."]);
listacompras.push(["Tomates", "1/2kg."]);
listacompras.push(["Manzanas", "1kg."]);
listar();
//sacar

//según el tipo de operación (agregar-borrar-editar) llama a la funcion de confirmación correspondiente
//el default es A de agregar
function confirmar_operacion() {
  switch (estado) {
    case "A":
      agregar_producto();
      break;
    case "B":
      confirmar_borrar();
      break;
    case "E":
      confirmar_editar();
      break;
    default:
      break;
  }
}
//si presiona el botón de cancelar la operación se pone en modo defaul y borrar los inputs de ingreso
function cancelar_operacion(){
  estado='A';
  titulo.innerHTML = "Agregar Producto";
  nombre.value='';
  cantidad.value='';
}
//agrega producto verificando que no sea duplicado
function agregar_producto() {
  indice = buscar_producto(nombre.value, -1);
  if (indice != undefined) {
    
    alert("Ya existe este producto en la lista.");
  } else {
    longitud = listacompras.push([nombre.value, cantidad.value]);
    listar();
  }
  cancelar_operacion()
  return;
}
//muestra el producto a borrar
function borrar_producto(index) {
  index_actual = index;
  estado = "B";
  titulo.innerHTML = "Borrar Producto";
  let renglon = listacompras[index];
  nombre.value = renglon[0];
  cantidad.value = renglon[1];
  return;
}
//borra el producto frente a la confirmación (botón verde)
function confirmar_borrar() {
  listacompras.splice(index_actual, 1);
  listar();
  cancelar_operacion();
  return;
}
//prepara el producto a editar mostrándolo en los inputs
function editar_producto(index) {
  index_actual = index;
  estado = "E";
  titulo.innerHTML = "Editar Producto";
  let renglon = listacompras[index];
  nombre.value = renglon[0];
  cantidad.value = renglon[1];
  return;
}
//confirma la edición teniendo en cuenta que no exista el producto editado en la lista
function confirmar_editar() {
  indice = buscar_producto(nombre.value, index_actual);
  if (indice != undefined) {
    alert("Ya existe este producto en la lista.");
  } else {
    listacompras.splice(index_actual, 1, [nombre.value, cantidad.value]);
  }
  listar();
  cancelar_operacion();
  return;
}
//lista los productos del arreglo en una tabla
function listar() {
  listado.innerHTML = "";
  var nombre_p, cantidad_p;

  for (let i = 0; i < listacompras.length; i++) {
    renglon = listacompras[i];
    nombre_p = renglon[0];
    cantidad_p = renglon[1];

    listado.innerHTML += `<tr>
    <td>${i + 1}</td><td>${nombre_p}</td><td>${cantidad_p}</td>
    <td><button type="button" class="btn btn-primary" data-bs-toggle="tooltip"
    data-bs-placement="top" title="Edita renglón" onclick="editar_producto(${i})">
    <i class="fa-solid fa-pencil"></i></button></td>
    <td><button type="button" class="btn btn-danger" data-bs-toggle="tooltip"
    data-bs-placement="top" title="Borra renglón" onclick="borrar_producto(${i})">
    <i class="fa-solid fa-trash"></i></button></td>
    </tr>`;
  }
  return;
}
//busca el producto en la lista
//si el parámetro índice es distinto de -1 es porque busca un valor fuera del índice actual (modo edición)
function buscar_producto(nombre, indice) {
  let existe = listacompras.find((elemento, i) => elemento[0].toUpperCase() == nombre.toUpperCase() && indice != i);
  return existe;
}


