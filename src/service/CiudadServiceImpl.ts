import {Pais} from "../model/Pais";
import http from "./conf";


/**
 * @description lista de ciudades por pais
 */
export const listaCiudadesPorPais = async (pais: Pais) => {
    return await http.get(`/ciudad/api/v1/lista_pais/${pais.id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}