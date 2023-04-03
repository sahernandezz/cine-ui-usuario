import {Articulo} from "./Articulo";
import {Funcion} from "./Funcion";
import {Factura} from "./Factura";
import {PuntajeUsuario} from "./PuntajeUsuario";

export interface FacturaFuncion extends Factura {
    id: number;
    fecha: Date;
    valor: number;
    articulo: Articulo;
    funcion: Funcion;
    puntaje: PuntajeUsuario;
}