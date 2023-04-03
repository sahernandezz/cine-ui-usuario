import {Articulo} from "./Articulo";

export interface Factura {
    id: number;
    fecha: Date;
    valor: number;
    articulo: Articulo;
}