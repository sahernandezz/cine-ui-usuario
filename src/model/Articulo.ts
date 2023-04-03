import {Pais} from "./Pais";

export interface Articulo {
    id: number;
    nombre: string;
    codigo: number;
    porcentajeImpuesto: number;
    pais: Pais;
}