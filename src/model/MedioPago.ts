import {Pais} from "./Pais";

export interface MedioPago{
    id: number;
    nombre: string;
    descripcion: string;
    pais: Pais;
}