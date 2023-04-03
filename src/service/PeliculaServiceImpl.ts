import http from './conf';
import {Pelicula} from "../model/Pelicula";
import {Usuario} from "../model/Usuario";
import getToken from "./token-config";
import {PuntajePelicula} from "../model/PuntajePelicula";

/**
 * @description lista de películas en cartelera
 */
export const listaPeliculasCarteleraPorCiudad = async (idCiudad: number) => {
    return await http.get(`/pelicula/api/v1/cartelera/${idCiudad}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * @description lista de películas próximas a estrenarse
 */
export const listaPeliculasProximamentePorCiudad = async (idCiudad: number) => {
    return await http.get(`/pelicula/api/v1/proximamente/${idCiudad}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * @description lista de películas por titulo
 */
export const listaPeliculasPorTitulo = async (idCiudad: number, titulo: string) => {
    return await http.get(`/pelicula/api/v1/titulo/${idCiudad}/${titulo}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * @description puntaje pelicula
 */
export const puntajePelicula = async (pelicula: Pelicula) => {
    return await http.get(`/pelicula/api/v1/puntaje/${pelicula.id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * @description puntaje pelicula por usuario
 */
export const puntajePeliculaPorUsuario = async (pelicula: Pelicula, usurio: Usuario) => {
    return await http.get(`/pelicula/api/v1/puntaje/${pelicula.id}/${usurio.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

/**
 * @description asignar puntaje pelicula por usuario
 */
export const guardarPuntajePelicula = async (puntaje: PuntajePelicula) => {
    return await http.post(`/pelicula/api/v1/puntaje`, puntaje, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}