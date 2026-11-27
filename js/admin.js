
const tablaPeliculas = document.querySelector('tbody');

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
    const peliculas = await index();
    pintarPeliculas(peliculas);

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

modalform.addEventListener('show.bs.modal', (event) => {
  if (event.relatedTarget && event.relatedTarget.classList.contains('btn-editar')) {
    return;
  }

  idEditando = null;
  inputId.value = '';
  formPelicula.reset();
});

formPelicula.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevaPelicula = {
    url: campoPoster.value.trim(),
    titulo: campoTitulo.value.trim(),
    genero: campoGenero.value,
    duracion: campoDuracion.value.trim(),
    horario: campoHorario.value.trim(),
    sala: campoSala.value,
    precio: Number(campoPrecio.value),
    estado: campoEstado.value
  };

  if (idEditando === null) {
    const creada = await store(nuevaPelicula);
    if (creada) {
      document.activeElement?.blur();
      modalBootstrap.hide();
      formPelicula.reset();
      await cargarPeliculas();
    }
  }
});