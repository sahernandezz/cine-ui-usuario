import http from "./conf";
import {Pais} from "../model/Pais";

/**
 * @description lista de paises
 */
export const listaTipoDocumento = async (pais: Pais) => {
    return await http.get(`/tipo_documento/api/v1/lista/${pais.id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

