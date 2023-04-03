import {MultiplexPelicula} from "./MultiplexPelicula";
import {MultiplexSala} from "./MultiplexSala";
import {MultiplexTarifa} from "./MultiplexTarifa";

export interface Funcion {
    id: number;
    fechaInicio: Date;
    multiplexPelicula: MultiplexPelicula;
    multiplexSala: MultiplexSala;
    multiplexTarifa: MultiplexTarifa;
}