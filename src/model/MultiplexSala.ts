import {TipoSala} from "./TipoSala";

export interface MultiplexSala {
    id: number;
    tipoSala: TipoSala;
    numeroColumnas: number;
    numeroFilas: number;
    sillasPreferencial: number;
    sillasGeneral: number;
    numeroSala: number;
}