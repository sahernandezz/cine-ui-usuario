import React, {useEffect, useState} from "react";
import {listaPeliculasCarteleraPorCiudad} from "../../service/PeliculaServiceImpl";
import {Pelicula} from "../../model/Pelicula";
import {namespaces} from "../../i18n/i18n.constants";
import {useTranslation} from "react-i18next";
import CatalogoPeliculas from "../../components/catalogo_peliculas/CatalogoPeliculas";
import {Parametros} from "../../model/Parametros";

const Cartelera = () => {
    const carteleraTranslation: any = useTranslation(namespaces.pages.cartelera).t;
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');

    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [loading, setLoading] = useState(true);

    const listaPeliculasQuery = async () => {
        await listaPeliculasCarteleraPorCiudad(params.ciudad === undefined ? 1 : params.ciudad.id).then((response: any) => {
            let data: Pelicula[] = response.data;
            setPeliculas(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        listaPeliculasQuery().then(() => null);
    }, []);

    return (
        <div className="pt-12">
            <CatalogoPeliculas peliculas={peliculas} titulo={carteleraTranslation("title")} loading={loading}/>
        </div>
    )
}

export default Cartelera;