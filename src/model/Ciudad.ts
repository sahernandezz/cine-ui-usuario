import {Pais} from "./Pais";

export interface Ciudad {
    id: number;
    codigo: string;
    nombre: string;
    pais: Pais;
}