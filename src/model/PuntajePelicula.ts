export interface PuntajePelicula {
    id: number | null;
    pelicula: {id: number | null};
    usuario: {id: number | null};
    multiplex: {id: number | null};
    puntaje: number;
}