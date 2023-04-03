import http from "./conf";
import {Ciudad} from "../model/Ciudad";
import {Pelicula} from "../model/Pelicula";
import {Funcion} from "../model/Funcion";
import getToken from "./token-config";
import {PagoFuncion} from "../model/PagoFuncion";

/**
 * @description funciones de una pelicula
 */
export const listaFuncionesPelicula = async (ciudad: Ciudad, pelicula: Pelicula) => {
    return await http.get(`/funcion/api/v1/funciones/${ciudad.id}/${pelicula.id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const sillasPorFuncion = async (funcion: Funcion) => {
    return await http.get(`/funcion/api/v1/sillas/${funcion.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export const pagarFuncion = async (pagoFuncion: PagoFuncion) => {
    return await http.post(`/funcion/api/v1/pago`, pagoFuncion, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}