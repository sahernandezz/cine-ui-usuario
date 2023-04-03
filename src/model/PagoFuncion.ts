import {Silla} from "./Silla";

export interface PagoFuncion {
    idFuncion: number;
    sillas: Silla[];
    cantidadSillas: number;
    idUsuario: number;
    tipoLocalidad: string;
    medioPago: number;
}