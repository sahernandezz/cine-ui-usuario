import img from "../../assets/img/font.jpg";
import {BsCalendarDate, MdFullscreen, MdLocationPin} from "react-icons/all";
import {formatDate} from "../../element/formatDateSimpleFormat";
import React, {useEffect} from "react";
import {listaMedioPagoPorPais} from "../../service/MedioPagoServiceImpl";
import {MedioPago} from "../../model/MedioPago";
import {cerrarSesion} from "../../element/user";
import {Funcion} from "../../model/Funcion";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {LocalidadCompra} from "../../model/localidadCompra";
import {UbicacionCompra} from "../../model/ubicacionCompra";
import {formatoValor} from "../../element/formatValor";
import {Parametros} from "../../model/Parametros";

const MenuCompra = () => {
    const funcion: Funcion = JSON.parse(window.sessionStorage.getItem("funcion_compra") || "{}");
    const localidad: LocalidadCompra = JSON.parse(window.sessionStorage.getItem("localidad_data") || "{}");
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const menuTranslation: any = useTranslation(namespaces.pages.compra).t;


    useEffect(() => {
        window.sessionStorage.removeItem('localidad_data');
        window.sessionStorage.removeItem('ubicacion_compra');
    }, []);

    return (
        <div className="md:m-8 overflow-hidden bg-white md:rounded shadow-lg">
            <img className="object-cover object-center w-full h-56"
                 src={funcion.multiplexPelicula.pelicula.imagen}
                 alt={funcion.multiplexPelicula.pelicula.titulo}/>

            <div className="flex items-center px-6 py-3 bg-gray-900">
                <h1 className="mx-3 text-lg font-semibold text-white">{funcion.multiplexPelicula.pelicula.titulo}</h1>
            </div>

            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">{menuTranslation('menu.title')}</h1>

                <div className="flex text-md my-4"><MdLocationPin className="w-5 h-5 mt-1 mx-1 text-gray-500"/>
                    <span>{funcion.multiplexPelicula.multiplex.nombre}</span></div>
                <div className="flex text-md my-4"><BsCalendarDate className="w-5 h-5 mt-1 mx-1 text-gray-500"/>
                    <span>{formatDate(funcion.fechaInicio)}</span></div>
                <div className="flex text-md mt-4"><MdFullscreen className="w-5 h-5 mt-1 mx-1 text-gray-500"/>
                    <span>{funcion.multiplexSala.tipoSala.nombre} - {funcion.multiplexTarifa.salaIdioma.nombre}</span>
                </div>
            </div>
            <div className="px-6 pb-8">
                <div className="flex border-t border-b mb-2 border-gray-200 py-2">
                    <span className="text-gray-500">{menuTranslation('menu.sillas')}</span>
                    <span
                        className="ml-auto text-gray-900">{localidad.cantidad !== undefined ? localidad.cantidad : 0}</span>
                </div>
                <div className="">
                    <span className="title-font font-medium text-2xl text-gray-900">{
                        formatoValor(localidad.valor !== undefined
                                ? localidad.valor * localidad.cantidad : 0,
                            params.idioma,
                            funcion.multiplexPelicula.multiplex.ciudad.pais.iso2,
                            funcion.multiplexPelicula.multiplex.ciudad.pais.iso3)
                    }</span>
                </div>
            </div>
        </div>
    )
}

export default MenuCompra;