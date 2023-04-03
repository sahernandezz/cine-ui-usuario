import {Genero} from "./Genero";

export interface Pelicula {
    id: number;
    titulo: string;
    tailer: string;
    imagen: string;
    tituloOriginal: string;
    director: string;
    recomendacion: string;
    estreno: Date;
    actores: string;
    paisOrigen: string;
    lenguaje: string;
    duracion: string;
    generos: Genero[];
}