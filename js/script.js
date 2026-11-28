const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const inputBuscador = document.getElementById('input-buscador');
const chips = document.querySelectorAll('.chip');

let listaPeliculas = []; // Guardará las películas traídas de la API

// 1. Función para dibujar las tarjetas en el HTML
function renderizarPeliculas(peliculas) {
    contenedorPeliculas.innerHTML = ''; // Limpiar contenedor

    if (peliculas.length === 0) {
        contenedorPeliculas.innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="text-white">No se encontraron películas con ese criterio.</p>
            </div>
        `;
        return;
    }

    peliculas.forEach((peli) => {
        // Formatear el precio a pesos (ej: $18.000)
        const precioFormateado = peli.precio.toLocaleString('es-CO');

        const cardHTML = `
            <div class="col-6 col-lg-3">
                <article class="peli">
                    <div class="poster">
                        <img src="${peli.url}" alt="${peli.titulo}">
                    </div>
                    <h3>${peli.titulo}</h3>
                    <p>
                        <strong>${peli.genero}</strong> • ${peli.duracion}<br>
                        ${peli.sala} | Horario: ${peli.horario}<br>
                        <span class="precio">$${precioFormateado}</span>
                    </p>
                    <a href="./pages/loginU.html" class="btn btn_asientos" data-id="${peli.id}">
                        🍿 Reservar
                    </a>
                </article>
            </div>
        `;

        contenedorPeliculas.innerHTML += cardHTML;
    });
}

// 2. Función principal que llama a tu función index() de la API
async function cargarCartelera() {
    // Llamamos a tu función index() que hace el GET a http://localhost:8080/peliculas
    const data = await index(); 
    
    // Filtramos solo las que estén "En cartelera" (opcional)
    listaPeliculas = data.filter(peli => peli.estado === "En cartelera");
    
    renderizarPeliculas(listaPeliculas);
}

// 3. Funcionalidad del buscador por texto
inputBuscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    const filtradas = listaPeliculas.filter(peli => 
        peli.titulo.toLowerCase().includes(texto) ||
        peli.genero.toLowerCase().includes(texto)
    );
    renderizarPeliculas(filtradas);
});

// 4. Funcionalidad de los botones (chips) por género
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        // Quitar clase 'activo' de todos y ponerla en el clickeado
        chips.forEach(c => c.classList.remove('activo'));
        chip.classList.add('activo');

        const generoSeleccionado = chip.getAttribute('data-genero') || chip.textContent.trim();

        if (generoSeleccionado.toLowerCase() === 'todos') {
            renderizarPeliculas(listaPeliculas);
        } else {
            const filtradas = listaPeliculas.filter(peli => 
                peli.genero.toLowerCase() === generoSeleccionado.toLowerCase()
            );
            renderizarPeliculas(filtradas);
        }
    });
});

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarCartelera);