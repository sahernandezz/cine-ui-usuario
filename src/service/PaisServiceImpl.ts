import http from "./conf";

/**
 * @description lista de paises
 */
export const listaPaises = async () => {
    return await http.get(`/pais/api/v1/lista`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

