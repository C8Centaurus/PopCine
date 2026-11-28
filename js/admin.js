/*----------------------------------   guardian de administrador  ----*/
function revisarSesion() {
  if (!sessionStorage.getItem("cine_sesion")) {
    document.documentElement.classList.add("sin-sesion");
    window.location.replace("login.html");
  }
}
/*---------------------------------- fin  guardian de administrador  ----*/
revisarSesion();
window.addEventListener("pageshow", revisarSesion);


const tablaPeliculas = document.querySelector('tbody');
let peliculasGuardadas = [];

function pintarPeliculas(peliculas){
    tablaPeliculas.innerHTML = ``;

    if(peliculas.length === 0){
        tablaPeliculas.innerHTML = `
        <tr>
            <td colspan="7" class="text-center text-white py-3">
                No hay películas registradas.
            </td>
        </tr>
        `
        return;
    }
    /*-----------------------------------------------------------   fila para peliculas -----------*/
    peliculas.forEach(pelicula => {
        const fila = document.createElement('tr');
        fila.className= `border-bottom border-dark-subtle`;

        fila.innerHTML = `
        <td class="ps-4 py-3">
            <div class="poster-placeholder  text-white d-flex align-items-center justify-content-center rounded-3 shadow-sm">
                <img src="${pelicula.url}" alt="${pelicula.titulo}" class="poster_admin">
            </div>
        </td>
        <td class="fw-bold text-danger">${pelicula.titulo}</td>
        <td class="text-white">${pelicula.genero}</td>
        <td class="text-white">${pelicula.duracion}</td>
        <td class="text-white">${pelicula.horario}</td>
        <td>
            <span class="badge rounded-pill badge-cartelera px-3 py-2">${pelicula.estado}</span>
        </td>
        <td class="pe-4">
            <button data-id="${pelicula.id}" class="btn btn-sm btn-editar  rounded-pill px-3 fw-semibold me-1">Editar</button>
            <button data-id="${pelicula.id}" class="btn btn-sm btn-cine rounded-pill px-3 fw-semibold">Eliminar</button>
        </td>
        `;
        tablaPeliculas.appendChild(fila);
        
    });
}
    async function cargarPeliculas() {
    peliculasGuardadas = await index();
    pintarPeliculas(peliculasGuardadas);

    }

document.addEventListener('DOMContentLoaded', cargarPeliculas);

/*-----------------------------------  boton agregar nueva (POST) -----------------------*/

const formPelicula = document.getElementById('formPelicula');
const modalform = document.getElementById('exampleModal');
const modalBootstrap = new bootstrap.Modal(modalform);


const campoId = document.getElementById('peliculaId');
const campoTitulo = document.getElementById('titulo');
const campoURL = document.getElementById('poster');
const campoGenero = document.getElementById('genero');
const campoDuracion = document.getElementById('duracion');
const campoHorario = document.getElementById('horario');
const campoEstado = document.getElementById('estado');
const campoSala = document.getElementById('sala');
const campoPrecio = document.getElementById('precio');

let idEditando = null;

// Preparar el formulario al agregar una película nueva.
const botonAgregar = document.querySelector('[data-bs-target="#exampleModal"]');
botonAgregar.addEventListener('click', () => {
  idEditando = null;
  campoId.value = '';
  formPelicula.reset();
  document.getElementById('exampleModalLabel').textContent = '🍿 Agregar película';
});

// Un solo evento para los botones que se crean en la tabla.
tablaPeliculas.addEventListener('click', async (e) => {
  const botonEditar = e.target.closest('.btn-editar');
  const botonEliminar = e.target.closest('.btn-cine');

  if (botonEditar) {
    const pelicula = peliculasGuardadas.find(p => String(p.id) === botonEditar.dataset.id);
    if (!pelicula) return;

    idEditando = pelicula.id;
    campoId.value = pelicula.id;
    campoTitulo.value = pelicula.titulo;
    campoURL.value = pelicula.url;
    campoGenero.value = pelicula.genero;
    campoDuracion.value = pelicula.duracion;
    campoHorario.value = pelicula.horario;
    campoEstado.value = pelicula.estado;
    campoSala.value = pelicula.sala;
    campoPrecio.value = pelicula.precio;
    document.getElementById('exampleModalLabel').textContent = '🍿 Editar película';
    modalBootstrap.show();
  }

  if (botonEliminar) {
    const pelicula = peliculasGuardadas.find(p => String(p.id) === botonEliminar.dataset.id);
    if (!pelicula) return;

    if (!confirm(`¿Quieres eliminar la película "${pelicula.titulo}"?`)) return;
    const eliminada = await deleteData(pelicula.id);
    if (eliminada) {
      await cargarPeliculas();
    } else {
      alert('No se pudo eliminar la película. Revisa JSON Server.');
    }
  }
});

formPelicula.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datosPelicula = {
    url: campoURL.value.trim(),
    titulo: campoTitulo.value.trim(),
    genero: campoGenero.value,
    duracion: campoDuracion.value.trim(),
    horario: campoHorario.value.trim(),
    sala: campoSala.value,
    precio: Number(campoPrecio.value),
    estado: campoEstado.value
  };

  let guardada;
  if (idEditando === null) {
    guardada = await store(datosPelicula);
  } else {
    // Conservamos otros datos que pudiera tener la película.
    const original = peliculasGuardadas.find(p => String(p.id) === String(idEditando));
    guardada = await update(idEditando, { ...original, ...datosPelicula });
  }

  if (guardada) {
    document.activeElement?.blur();
    modalBootstrap.hide();
    formPelicula.reset();
    idEditando = null;
    await cargarPeliculas();
  } else {
    alert('No se pudieron guardar los cambios. Revisa JSON Server.');
  }
});

// Cerrar sesión elimina el dato utilizado para proteger el administrador.
const botonCerrarSesion = document.getElementById('cerrarSesion');
botonCerrarSesion.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('cine_sesion');
  window.location.replace('../index.html');
});
