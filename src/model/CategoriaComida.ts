import {Comida} from "./Comida";

export interface CategoriaComida {
    id: number;
    nombre: string;
    imagen: string;
    comidas: Comida[];
}