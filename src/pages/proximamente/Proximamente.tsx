import React, {Fragment, useEffect, useState} from "react";
import {Pelicula} from "../../model/Pelicula";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {listaPeliculasProximamentePorCiudad} from "../../service/PeliculaServiceImpl";
import CatalogoPeliculas from "../../components/catalogo_peliculas/CatalogoPeliculas";
import {Parametros} from "../../model/Parametros";
import LoadFullV1 from "../../components/load/load_full_v1/LoadFullV1";
import PiePagina from "../../components/pie_pagina/PiePagina";

const Proximamente = () => {

    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const proximamente: any = useTranslation(namespaces.pages.proximamente).t;
    const [loading, setLoading] = useState(true);
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const listaPeliculasQuery = async () => {
        await listaPeliculasProximamentePorCiudad(params.ciudad === undefined ? 1 : params.ciudad.id).then((response: any) => {
            let data: Pelicula[] = response.data;
            setPeliculas(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        window.sessionStorage.removeItem('visualizar_pelicula');
        listaPeliculasQuery().then(() => null);
    }, []);

    return (
        <Fragment>
            <div className="pt-12">
                <CatalogoPeliculas peliculas={peliculas} titulo={proximamente("title")} loading={loading}/>
            </div>
        </Fragment>
    )
}

export default Proximamente;