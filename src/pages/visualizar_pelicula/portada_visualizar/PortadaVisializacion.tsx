import React, {Fragment, useEffect, useState} from "react";
import {Pelicula} from "../../../model/Pelicula";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import img from "../../../assets/img/font.jpg";
import Etiqueta from "../../../components/etiqueta/Etiqueta";
import {formatDateSimpleFormat} from "../../../element/formatDateSimpleFormat";
import Estrellas from "../../../components/estrellas/Estrellas";
import {puntajePelicula} from "../../../service/PeliculaServiceImpl";

const PortadaVisializacion = (props: { pelicula: Pelicula }) => {
    const peliculasPage: any = useTranslation(namespaces.pages.peliculas).t;
    const [puntaje, setPuntaje] = useState<number>(0);

    const puntajeQuery = async () => {
        await puntajePelicula(props.pelicula).then((response: any) => {
            let data: number = response.data;
            setPuntaje(Number.parseInt(String(data)));
        });
    }

    useEffect(() => {
        puntajeQuery().then(() => null);
    }, []);

    const style = {
        backgroundImage: `url(${img})`
    };

    return (
        <Fragment>
            <div style={style} className="text-white body-font overflow-hidden">
                <div className="container p-2 pt-12 pb-10 mx-auto ">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={props.pelicula.tituloOriginal}
                             style={{width: 400, height: 550}}
                             className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                             src={props.pelicula.imagen}/>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <div className="">
                                <h1 className="text-4xl mb-5 font-bold">{props.pelicula.titulo}</h1>
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("manager")}</p>
                                        <p className="text-white mb-5">{props.pelicula.director}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("actors")}</p>
                                        <p className="text-white text-lg mb-5">{props.pelicula.actores}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("premiere")}</p>
                                        <p className="text-white text-lg mb-5">{formatDateSimpleFormat(props.pelicula.estreno)}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mr-8">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("original_language")}</p>
                                        <p className="text-sm">{props.pelicula.lenguaje}</p>
                                    </div>
                                    <div className="mr-8">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("country_of_origin")}</p>
                                        <p className="text-sm">{props.pelicula.paisOrigen}</p>
                                    </div>
                                    <div className="mr-8">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("duration")}</p>
                                        <p className="text-sm">{props.pelicula.duracion} {peliculasPage("hours")}</p>
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <p className="text-gray-300 text-sm mb-2">{peliculasPage("genero")}</p>
                                    <div className="flex">
                                        {props.pelicula.generos.map((genero) => {
                                            return <div key={genero.id} className="pr-2"><Etiqueta
                                                                                   texto={genero.nombre}/></div>
                                        })}
                                        <div className="pr-2"><Etiqueta texto={props.pelicula.recomendacion}/></div>
                                    </div>
                                </div>
                                {puntaje > 0 ?
                                    <div className="pt-5">
                                        <p className="text-gray-300 text-sm mb-2">{peliculasPage("assessment")}</p>
                                        <Estrellas valoracion={puntaje}/>
                                    </div> : <Fragment/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PortadaVisializacion;