// Importamos del archivo constants
import {API_KEY, API_HOST, API_LANG} from '../utils/constants';
//Creamos la función para extraer las peliculas
export function getNewsMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;
  // Montamos la url que necesita Moviedb para devolvernos el resultado

  return fetch(url) // Extraemos en formato JSON todas las peliculas a través de la promesa
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}
