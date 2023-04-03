import {TarifaComida} from "./TarifaComida";

export interface PagoComidaDetalle {
    id: number;
    cantidad: number;
    tarifaComida: TarifaComida;
    valor: number;
}