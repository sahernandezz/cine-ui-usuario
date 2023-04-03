import React, {Fragment, useState} from "react";
import Estrellas from "../../../components/estrellas/Estrellas";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import {guardarPuntajePelicula} from "../../../service/PeliculaServiceImpl";
import {cerrarSesion} from "../../../element/user";
import {PuntajePelicula} from "../../../model/PuntajePelicula";

const MensajeEstrellas = (props: { default: PuntajePelicula, exit: Function, refrescar: Function }) => {
    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;
    const [puntaje, setPuntaje] = useState<PuntajePelicula>(props.default);
    const [btnEstado, setBtnEstado] = useState<boolean>(false);

    const puntajeQuery = async (puntajePelicula: PuntajePelicula) => {
        await guardarPuntajePelicula(puntajePelicula).then((response: any) => {
            props.exit();
            props.refrescar();
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const eventBtn = (value: number) => {
        const puntajePelicula: PuntajePelicula = {
            id: puntaje.id,
            puntaje: value,
            usuario: puntaje.usuario,
            pelicula: puntaje.pelicula,
            multiplex: puntaje.multiplex
        }

        setPuntaje(puntajePelicula);

        if (props.default.puntaje !== value && value !== 0) {
            setBtnEstado(true);
        } else {
            setBtnEstado(false);
        }
    }

    const eventoPuntaje = () => {
        puntajeQuery(puntaje).then(() => null);
    }

    return (
        <Fragment>
            <div>
                <div className="flex items-center justify-center">
                    <p className="mt-2 text-xl text-gray-500">{perfilTranslation('title_modal')}</p>
                </div>

                <div className="mt-2 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize"
                        id="modal-title"></h3>
                    <div className="mx-12 px-12">
                        <Estrellas valoracion={puntaje.puntaje}/>
                        <select onInput={(e) => eventBtn(parseInt(e.currentTarget.value))}
                                className="w-24 text-lg text-center outline-none p-1 rounded bg-gray-100 shadow-lg"
                                defaultValue={puntaje.puntaje}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                <button onClick={() => eventoPuntaje()}
                        disabled={!btnEstado}
                        className="w-full disabled:opacity-50 px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                    {perfilTranslation('btn_modal')}
                </button>
            </div>
        </Fragment>
    )
}

export default MensajeEstrellas;