import {Pais} from "./Pais";

export interface TipoDocumento {
    id: number;
    nombre: string;
    pais: Pais;
}