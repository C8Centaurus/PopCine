const API_URL = 'http://localhost:8080/peliculas'


async function store(peliculas) {
  try {
    const res = await fetch('API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(peliculas)
    });
    if(res = ok){
        
    }
    const data = await res.json();
  } catch (error) {
    console.error('Error en POST:', error);
  }
}