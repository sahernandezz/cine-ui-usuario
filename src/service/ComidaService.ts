import http from "./conf";

export const listaCategoriaComidaPorPais = async (idPais: number) => {
    return await http.get(`/categoria_comida/api/v1/lista_pais/${idPais}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}