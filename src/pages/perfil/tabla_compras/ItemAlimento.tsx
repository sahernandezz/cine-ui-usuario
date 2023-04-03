import React from "react";
import {formatDate} from "../../../element/formatDateSimpleFormat";
import {Parametros} from "../../../model/Parametros";
import {FacturaComida} from "../../../model/FacturaComida";

const ItemAlimento = (props: { factuta: FacturaComida }) => {
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const formatoValor = (valor: number) => {
        return new Intl.NumberFormat(params.idioma + '-' + props.factuta.articulo.pais.iso2.toUpperCase(), {
            style: 'currency',
            currency: props.factuta.articulo.pais.iso3.toUpperCase()
        }).format(valor);
    }

    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left"><span>-</span></div>
                </td>
            </td>
            <td className="p-2 whitespace-nowrap">
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left"><span>{props.factuta.articulo.nombre}</span></div>
                </td>
            </td>
            <td className="p-2 whitespace-nowrap">
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left"><span>{formatDate(props.factuta.fecha)}</span></div>
                </td>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">
                    <span>{props.factuta.multiplex.ciudad.nombre
                        + " - " +
                        props.factuta.multiplex.nombre}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left"><span>-</span></div>
                </td>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">
                    <span>+{props.factuta.puntaje.puntaje}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div
                    className="text-left font-medium text-green-500"><span>{formatoValor(props.factuta.valor)}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div
                    className="text-left font-medium text-red-500">
                    <span>{props.factuta.articulo.porcentajeImpuesto * 100}%</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left"><span>-</span></div>
                </td>
            </td>
        </tr>
    )
}

export default ItemAlimento;