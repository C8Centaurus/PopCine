# POPCINE — Catálogo y Gestión de Cartelera Cinematográfica

Aplicación web de cine que permite a los visitantes explorar la cartelera, buscar y filtrar películas, consultar experiencias VIP y dulcería, y a los administradores gestionar el catálogo completo mediante una API REST (`json-server`).

---

## Estructura del proyecto

```text
PopCine/
├── css/
│   ├── admin.css
│   ├── login.css
│   └── style.css
├── img_admin/
│   └── Logotipo_POPCINE_Cinematografico_3D.png
├── img_login/
│   └── logo.png
├── js/
│   ├── admin.js
│   ├── Api.js
│   ├── login.js
│   └── script.js
├── Json-Server/
│   └── db.json
├── landing.img/
│   ├── alien.jpg
│   ├── Cubeta de palomitas...
│   ├── duna-poster.jpg
│   ├── DUNETWO.jpg
│   ├── joker.jpg
│   ├── Logotipo POPCINE...
│   └── oppenheimer.jpg
├── pages/
│   ├── admin.html
│   └── login.html
├── index.html
└── landing.css
```

---

## Funcionalidades principales

### 1. Cartelera pública (`index.html` + `js/script.js`)
* **Banner destacado:** Presenta información principal de sala (`Sala 01 VIP`) y película destacada (*Dune: Parte Dos*) con acceso rápido a cartelera.
* **Listado dinámico en tarjetas:** Obtiene las películas desde la API (`http://localhost:8080/peliculas`) y renderiza tarjetas con póster, título, género, duración, sala, horario y precio formateado.
* **Búsqueda en tiempo real:** Filtra películas escribiendo en el campo de búsqueda por título o género.
* **Filtros por categoría (chips):** Permite filtrar el catálogo rápidamente según el género o categoría seleccionada.
* **Sección de confitería y footer:** Muestra combos y promociones de palomitas/bebidas y enlaces de navegación interna hacia cartelera, salas y confitería.

### 2. Inicio de sesión de administrador (`pages/login.html` + `js/login.js`)
* **Animación interactiva con GSAP:** Al hacer clic en la cubeta de palomitas, se dispara una animación con partículas de palomitas y se revela la tarjeta del formulario de acceso.
* **Validación de credenciales:** Verifica que los campos de correo y contraseña no estén vacíos y valida contra las credenciales configuradas (`admin@cinecatalogo.com` / `palomitas123`).
* **Mostrar/ocultar contraseña:** Botón para alternar la visibilidad del campo de contraseña.
* **Gestión de sesión:** Guarda la sesión activa en `sessionStorage` (`cine_sesion`) y redirige al panel administrativo (`admin.html`). Si ya existe una sesión activa al entrar al login, redirige automáticamente al panel.

### 3. Panel de administración (`pages/admin.html` + `js/admin.js`)
* **Guardián de sesión:** Verifica que exista `cine_sesion` en `sessionStorage`; si no hay sesión iniciada, redirige a `login.html`.
* **Listado en tabla:** Muestra todas las películas registradas con su póster, título, género, duración, horario, estado y botones de acción.
* **Crear película (`POST`):** Abre un modal (`#exampleModal`) con el formulario vacío para registrar una nueva película en la API y refresca la tabla.
* **Editar película (`PUT`):** Al pulsar **Editar**, carga los datos de la película seleccionada dentro del modal (`#exampleModal`), permite modificarlos y envía la actualización a `http://localhost:8080/peliculas/:id`.
* **Eliminar película (`DELETE`):** Solicita confirmación y elimina el registro seleccionado desde la API, actualizando la vista.

### 4. Capa de consumo de API (`js/Api.js` + `Json-Server/db.json`)
Centraliza las peticiones HTTP hacia `http://localhost:8080/peliculas` mediante `fetch`:
* `index()` — `GET`: Obtiene el listado de películas.
* `store(pelicula)` — `POST`: Crea una nueva película.
* `update(id, pelicula)` — `PUT`: Actualiza una película existente por `id`.
* `deleteData(id)` — `DELETE`: Elimina una película por `id`.

*  `npx json-server Json-Server/db.json --port 8080`
---

## Puesta en marcha

1. **Iniciar el servidor de datos (`json-server`):**
   Asegúrate de tener corriendo `json-server` apuntando a `Json-Server/db.json` en el puerto `8080` (`http://localhost:8080/peliculas`).
2. **Abrir la aplicación:**
   Sirve el proyecto con un servidor local (por ejemplo, **Live Server** en VS Code) y abre `index.html`.
3. **Acceder al panel admin:**
   Navega a `pages/login.html` (o desde el ícono de administrador en la barra superior) e inicia sesión con las credenciales de prueba.
````[cite: 1, 2, 3]

