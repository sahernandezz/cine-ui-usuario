import {Pelicula} from "./Pelicula";
import {Multiplex} from "./Multiplex";

export interface MultiplexPelicula {
    id: number;
    pelicula: Pelicula;
    multiplex: Multiplex;
}