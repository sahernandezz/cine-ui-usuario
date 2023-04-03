import {Fragment} from "react";
import {Pelicula} from "../../../model/Pelicula";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import Etiqueta from "../../etiqueta/Etiqueta";
import {Link} from "react-router-dom";
import {formatDateSimpleFormat} from "../../../element/formatDateSimpleFormat";
import {Genero} from "../../../model/Genero";

const ItemPelicula = (props: { pelicula: Pelicula }) => {
    const peliculasPage: any = useTranslation(namespaces.pages.peliculas).t;

    const agregarPelicula = () => {
        window.sessionStorage.setItem('visualizar_pelicula', JSON.stringify(props.pelicula));
    }

    const parseGenero = (generos: Genero[]): string => {
        let stringConcat: string[] = [];
        generos.forEach((genero: Genero) => {
            stringConcat.push(genero.nombre + ", ");
        });
        return stringConcat.join("").slice(0, -2);
    }

    return (
        <Fragment>
            <div
                className="rounded shadow-lg shadow-gray-400 bg-gray-800 duration-300 hover:-translate-y-2">
                <Link to={`/peliculas/${props.pelicula.tituloOriginal}`} className="cursor-pointer"
                      onClick={agregarPelicula}>
                    <div>
                        <img src={props.pelicula.imagen} className="rounded-t h-72 w-full object-cover"
                             style={{width: 400, height: 370, objectFit: 'cover'}}
                             alt={props.pelicula.tituloOriginal}/>
                        <div className="p-3">
                            <p className="text-lg mb-3 font-bold leading-relaxed text-gray-300">
                                {props.pelicula.titulo}
                            </p>
                            <div>
                                <ol className="mb-1 flex">
                                    <li className="text-gray-500 text-sm px-1">{peliculasPage("genero")}:</li>
                                    <li className="text-gray-300 text-sm">{parseGenero(props.pelicula.generos)}</li>
                                </ol>
                                <ol className="mb-3 flex">
                                    <li className="text-gray-500 text-sm px-1">{peliculasPage("premiere")}:</li>
                                    <li className="text-gray-300 text-sm">{formatDateSimpleFormat(props.pelicula.estreno)}</li>
                                </ol>
                                <div className="d-flex mb-1">
                                    <span className="pr-1">
                                          <Etiqueta
                                              texto={props.pelicula.recomendacion}/>
                                    </span>
                                    <span className="">
                                            <Etiqueta texto={props.pelicula.duracion + " " + peliculasPage("hours")}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </Fragment>
    )
}

export default ItemPelicula;