import {Funcion} from "../../model/Funcion";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {Parametros} from "../../model/Parametros";
import MenuCompra from "../../components/menu_compra/MenuCompra";
import {useNavigate} from "react-router-dom";
import {formatoValor} from "../../element/formatValor";

const LocalidadCompra = () => {
    const menuTranslation: any = useTranslation(namespaces.pages.compra).t;
    const commonTranslation: any = useTranslation(namespaces.common).t;
    const selectValue = useRef<any>();

    const funcion: Funcion = JSON.parse(window.sessionStorage.getItem("funcion_compra") || "{}");
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [numeroSillas, setNumeroSillas] = React.useState<number>(0);
    const [precioTotal, setPrecioTotal] = React.useState<number>(0);

    const navigate = useNavigate();

    const selectChange = (event: any) => {
        if (Number(event.target.value) === 0) {
            setDisabled(true);
            setNumeroSillas(0);
            setPrecioTotal(0);
        } else {
            setNumeroSillas(0);
            setPrecioTotal(0);
            setDisabled(false);
        }
    }

    const numeroSillasMenos = (sillas: number) => {
        if (sillas > 0) {
            setNumeroSillas(sillas - 1);
            setPrecioTotal((sillas - 1) * Number.parseFloat(selectValue.current.value));
        }
    }

    const numeroSillasMas = (sillas: number) => {
        if (sillas < 9) {
            setNumeroSillas(sillas + 1);
            setPrecioTotal((sillas + 1) * Number.parseFloat(selectValue.current.value));
        }
    }

    const siguiente = () => {
        if (precioTotal > 0 && numeroSillas > 0) {
            window.sessionStorage.setItem("localidad_data", JSON.stringify({
                tipoLocalidad: funcion.multiplexTarifa.valorGeneral
                === Number.parseFloat(selectValue.current.value)
                    ? 'G' : 'P',
                valor: funcion.multiplexTarifa.valorGeneral
                === Number.parseFloat(selectValue.current.value)
                    ? funcion.multiplexTarifa.valorGeneral : funcion.multiplexTarifa.valorPreferencial,
                cantidad: numeroSillas
            }));
            navigate('/compra/ubicacion');
        }
    }

    return (
        <div className="md:w-10/12 w-full">
            <div className="text-center md:m-8 bg-white p-8 md:rounded shadow-lg">
                <h1 className="text-xl">{menuTranslation('localidad.sub_title')}</h1>
                <div className="md:flex py-8">
                    <div className="md:w-1/2">
                        <span className="text-gray-500">{menuTranslation('localidad.title')}</span>
                        <select required={true}
                                onInput={(e) => selectChange(e)}
                                ref={selectValue}
                                className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                            <option value={0} selected disabled>{commonTranslation("select_index")}</option>
                            <option
                                value={funcion.multiplexTarifa.valorGeneral}>{menuTranslation('localidad.general')}</option>
                            <option
                                value={funcion.multiplexTarifa.valorPreferencial}>{menuTranslation('localidad.preferencial')}</option>
                        </select>
                    </div>
                    <div className="md:w-1/2">
                        <h2>{menuTranslation('localidad.sillas')}</h2>
                        <button
                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
                            onClick={() => numeroSillasMenos(numeroSillas)}
                            disabled={disabled}>-
                        </button>
                        <span className="text-xl mx-4">{numeroSillas}</span>
                        <button
                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
                            onClick={() => numeroSillasMas(numeroSillas)}
                            disabled={disabled}>+
                        </button>
                    </div>
                </div>

                <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500 mr-8">{menuTranslation('localidad.numero_sillas')}</span>
                    <span className="text-gray-900">{numeroSillas} {menuTranslation('localidad.sillas')}</span>
                </div>
                <div className="flex border-t border-gray-200 py-2 text-xl">
                    <span className="text-gray-500">{menuTranslation('localidad.total_pago')}:</span>
                    <span className="ml-auto text-gray-900">{
                        formatoValor(precioTotal,
                            params.idioma,
                            funcion.multiplexPelicula.multiplex.ciudad.pais.iso2,
                            funcion.multiplexPelicula.multiplex.ciudad.pais.iso3)
                    }</span>
                </div>
                <button onClick={siguiente}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        disabled={disabled || precioTotal === 0 || numeroSillas === 0}>{menuTranslation('localidad.btn_continuar')}
                </button>
            </div>
        </div>
    )
}

export default LocalidadCompra;