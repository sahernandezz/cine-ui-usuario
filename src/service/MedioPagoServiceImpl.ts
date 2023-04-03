import http from "./conf";
import getToken from "./token-config";
import {Pais} from "../model/Pais";


export const listaMedioPagoPorPais = async (pais: Pais) => {
    return await http.get(`/medio_pago/api/v1/lista/${pais.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}
