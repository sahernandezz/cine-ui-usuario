import {Articulo} from "./Articulo";
import {Multiplex} from "./Multiplex";
import {Factura} from "./Factura";
import {PuntajeUsuario} from "./PuntajeUsuario";

export interface FacturaComida extends Factura{
    id: number;
    valor: number;
    fecha: Date;
    multiplex: Multiplex;
    articulo: Articulo;
    puntaje: PuntajeUsuario;
}