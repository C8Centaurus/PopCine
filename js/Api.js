const API_URL = 'http://localhost:8080/peliculas'

/*----------------------------------------------------------------  POST ---------------------------*/
async function store(pelicula) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pelicula)
    });
    if (!res.ok) {
      console.error('Error HTTP en POST:', res.status);
      return null;
    }

    const data = await res.json();
    console.log('POST:', data);
    return data;
  } catch (error) {
    console.error('Error en POST:', error);
    return null;
  }
}
/*----------------------------------------------------------------  GET ---------------------------*/
async function index() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      console.error('Error HTTP:', res.status);
      return [];
    }
    const data = await res.json();
    console.log('GET:', data);
    return data;
  } catch (error) {
    console.error('Error en GET:', error);
    return [];
  }
}
/*----------------------------------------------------------------  PUT ---------------------------*/
async function update(id, pelicula) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pelicula)
    });
    if(!res.ok){
      console.error('Error HTTP en PUT:', res.status);
      return null;      
    }
    const data = await res.json();
    console.log('PUT:', data);
    return data;
  } catch (error) {
    console.error('Error en PUT:', error);
    return null;
  }
}
/*---------------------------------------------------------------- DELETE ---------------------------*/
async function deleteData(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      console.log('DELETE: Recurso eliminado');
      return true
    } else {
      console.error('Error HTTP en DELETE:', res.status);
      return false;
    }
    
  } catch (error) {
    console.error('Error en DELETE:', error);
    return false;
  }
}
