import {Multiplex} from "./Multiplex";
import {Comida} from "./Comida";

export interface TarifaComida {
    id: number;
    multiplex: Multiplex;
    comida: Comida;
}