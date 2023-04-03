import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import ItemMultiplex from "./ItemMultiplex";
import {Pelicula} from "../../../model/Pelicula";
import {listaFuncionesPelicula} from "../../../service/FuncionServiceImpl";
import {Parametros} from "../../../model/Parametros";
import {Funcion} from "../../../model/Funcion";
import {Multiplex} from "../../../model/Multiplex";
import {MultiplexFuncion} from "../../../model/MultiplexFuncion";

const MultiplexVisualizar = (props: { pelicula: Pelicula }) => {
    const peliculasPage: any = useTranslation(namespaces.pages.peliculas).t;
    const [multiplexFunciones, setMultiplexFunciones] = useState<MultiplexFuncion[]>([]);
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const listaFuncionesQuery = async () => {
        await listaFuncionesPelicula(params.ciudad, props.pelicula).then((response: any) => {
            const funciones: Funcion[] = response.data;
            setMultiplexFunciones(asignarFuncionesPorMultiplex(funciones));
        });
    }

    const asignarFuncionesPorMultiplex = (funciones: Funcion[]) => {
        const lista: MultiplexFuncion[] = [];
        funciones.forEach((funcion: Funcion) => {
            const multiplex: Multiplex = funcion.multiplexPelicula.multiplex;
            if (!isExistMultiplex(multiplex, lista)) {
                const multiplex: Multiplex = funcion.multiplexPelicula.multiplex;

                const listaFunciones: Funcion[] = funciones.filter((funcion: Funcion) => {
                    return funcion.multiplexPelicula.multiplex.id === multiplex.id;
                });

                if (listaFunciones) {
                    lista.push({multiplex: multiplex, funciones: listaFunciones});
                }
            }
        }, []);
        return lista;
    }

    const isExistMultiplex = (multiplex: Multiplex, multiplexFuncion: MultiplexFuncion[]) => {
        let isExist = false;
        multiplexFuncion.forEach((item: MultiplexFuncion) => {
            if (item.multiplex.id === multiplex.id) {
                isExist = true;
            }
        });
        return isExist;
    }

    useEffect(() => {
        listaFuncionesQuery().then(() => null);
    }, []);


    return (
        <Fragment>
            <section className="text-gray-600 body-font overflow-hidden pt-16">
                <h2 className="text-center pb-4 text-2xl text-gray-900 font-bold md:text-4xl">{peliculasPage("multiplex_functions")}</h2>
                <ul className="h-96 mx-4 overflow-y-auto">
                    {
                        multiplexFunciones.length > 0 ? multiplexFunciones.map((multiplexFunciones: MultiplexFuncion, index: number) => {
                            return <li key={index}><ItemMultiplex key={multiplexFunciones.multiplex.id}
                                                                  multiplexFunciones={multiplexFunciones}/></li>
                        }) : <div className="text-center content-center text-2xl m-20">
                            <label>{peliculasPage("no_functions")}</label>
                        </div>
                    }
                </ul>
            </section>
        </Fragment>
    )
}

export default MultiplexVisualizar;