import {TipoSala} from "./TipoSala";
import {SalaTipoIdioma} from "./SalaTipoIdioma";

export interface MultiplexTarifa {
    id: number;
    valorGeneral: number;
    valorPreferencial: number;
    tipoSala: TipoSala;
    salaIdioma: SalaTipoIdioma;
}