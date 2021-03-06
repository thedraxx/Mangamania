// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector(".item1");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //cuando agregas un curso presionando agregar al Carrito
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //muestra los cursos de local storage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito") || []);
    carritoHTML();
  });

  // vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // resetear el arreglo
    limpiarHTML(); // eliminamos todo el html
  });
}

//funciones
function agregarCurso(e) {
  // console.log(e.target.classList);
  e.preventDefault();
  if (e.target.classList.contains("boton")) {
    const cursoSeleccionado =
      e.target.parentElement.parentElement.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina un curso del carrito
function eliminarCurso(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); // volvemos a iterar sobre el carrito y mostrar su html
  }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  console.log(curso);

  //crear un objeto con el contenido del curso actual
  const infoCurso = {
    titulo: curso.querySelector(".titulo").textContent,
    precio: curso.querySelector(".precio").textContent,
    id: curso.querySelector(".boton").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualiza cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna  los objetos que no son duplicado
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregamos curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  console.log(articulosCarrito);
  carritoHTML();
}

// muestra el carrito de compras en el html

function carritoHTML() {
  // limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <p> Nombre: </p>
    <td>  
    ${titulo}
    </td> 
    <p> Precio: </p>
    <td> 
    ${precio}
    </td>
    <p> Cantidad </p>
    <td> 
    ${cantidad}
     </td>
    <td>
      <a href="#" class="borrar-curso" data-id=${id} > x </a>
    </td>
    `;

    // agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Elimina los cursos del Tbody
function limpiarHTML() {
  // //forma lenta
  // contenedorCarrito.innerHTML = ` `;
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  sincronizarStorage();
}
