import React, {useEffect, useState} from "react";
import {FacturaFuncion} from "../../../model/FacturaFuncion";
import {Pelicula} from "../../../model/Pelicula";
import {Link} from "react-router-dom";
import {BiMoviePlay} from "react-icons/all";
import {puntajePeliculaPorUsuario} from "../../../service/PeliculaServiceImpl";
import {Usuario} from "../../../model/Usuario";
import {cerrarSesion} from "../../../element/user";
import Estrellas from "../../../components/estrellas/Estrellas";
import {formatDate} from "../../../element/formatDateSimpleFormat";
import {Parametros} from "../../../model/Parametros";
import MensajeEstrellas from "./MensajeEstrellas";
import {PuntajePelicula} from "../../../model/PuntajePelicula";

const ItemPelicula = (props: { factura: FacturaFuncion, modal: Function, component: Function }) => {
    const pelicula: Pelicula = props.factura.funcion.multiplexPelicula.pelicula;
    const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}');
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const [puntajePelicula, setPuntajePelicula] = useState<PuntajePelicula>({
        id: null,
        puntaje: 0,
        // @ts-ignore
        usuario: {id: usuario.id},
        pelicula: {id: pelicula.id},
        multiplex: {id: props.factura.funcion.multiplexPelicula.multiplex.id}
    });

    const agregarPelicula = () => {
        window.sessionStorage.setItem('visualizar_pelicula', JSON.stringify(pelicula));
    }

    const formatoValor = (valor: number) => {
        return new Intl.NumberFormat(params.idioma + '-' + props.factura.articulo.pais.iso2.toUpperCase(), {
            style: 'currency',
            currency: props.factura.articulo.pais.iso3.toUpperCase()
        }).format(valor);
    }

    const puntajeQuery = async () => {
        await puntajePeliculaPorUsuario(pelicula, usuario).then((response: any) => {
            let data: PuntajePelicula = response.data;
            if (data !== null) {
                const puntaje: PuntajePelicula = {
                    id: data.id,
                    puntaje: data.puntaje,
                    usuario: puntajePelicula.usuario,
                    pelicula: puntajePelicula.pelicula,
                    multiplex: puntajePelicula.multiplex
                }
                setPuntajePelicula(puntaje);
            }
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const eventoPuntaje = () => {
        props.component(<MensajeEstrellas default={puntajePelicula} exit={() => props.modal(false)}
                                          refrescar={() => puntajeQuery().then(() => null)}/>);
        props.modal(true);
    }

    useEffect(() => {
        puntajeQuery().then(() => null);
    }, []);

    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <Link to={`/peliculas/${pelicula.titulo}`} onClick={agregarPelicula}
                      className="text-gray-800 hover:text-blue-500 flex items-center">
                    <div className="font-medium flex">
                        <BiMoviePlay className="w-6 h-6 mx-2"/>
                        <span>{pelicula.titulo}</span>
                    </div>
                </Link>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left"><span>{props.factura.articulo.nombre}</span></div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left"><span>{formatDate(props.factura.fecha)}</span></div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">
                    <span>{props.factura.funcion.multiplexPelicula.multiplex.ciudad.nombre
                        + " - " +
                        props.factura.funcion.multiplexPelicula.multiplex.nombre}</span>
                </div>
            </td>

            <td className="p-2 whitespace-nowrap">
                <div className="text-left">
                    <span>{props.factura.funcion.multiplexSala.tipoSala.nombre} - {props.factura.funcion.multiplexTarifa.salaIdioma.nombre}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">
                    <span>+{props.factura.puntaje.puntaje}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div
                    className="text-left font-medium text-green-500"><span>{formatoValor(props.factura.valor)}</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div
                    className="text-left font-medium text-red-500">
                    <span>{props.factura.articulo.porcentajeImpuesto * 100}%</span>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div onClick={eventoPuntaje} className="cursor-pointer text-left">
                    <Estrellas valoracion={puntajePelicula.puntaje}/>
                </div>
            </td>
        </tr>
    )
}

export default ItemPelicula;