import React, {useEffect, useState} from "react";
import CatalogoPeliculas from "../../components/catalogo_peliculas/CatalogoPeliculas";
import {Pelicula} from "../../model/Pelicula";
import {listaPeliculasPorTitulo} from "../../service/PeliculaServiceImpl";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {useNavigate} from "react-router-dom";

const BuscarPelicula = () => {
    const params: any = JSON.parse(window.localStorage.getItem('params') || '{}');
    const buscarTranslation: any = useTranslation(namespaces.pages.buscar_pelicula).t;

    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState<string>("");
    const {titulo} = useParams<string>();
    const navigate = useNavigate();

    const listaPeliculasQuery = async (titulo: string) => {
        await listaPeliculasPorTitulo(params.ciudad.id, titulo).then((response: any) => {
            let data: Pelicula[] = response.data;
            setPeliculas(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        setLoading(true);
        if (titulo !== "" && titulo != null) {
            setTimeout(() => {
                setBusqueda(titulo);
                listaPeliculasQuery(titulo).then(() => null);
            }, 800);
        } else {
            navigate('/');
        }
    }, [titulo]);

    return (
        <div className="pt-12">
            {
                peliculas.length != 0 || loading ? <CatalogoPeliculas peliculas={peliculas} titulo={busqueda}
                                                                      loading={loading}/> :
                    <div className="text-center content-center text-2xl m-20">
                        <label>{buscarTranslation("does_not_exist")}</label></div>
            }

        </div>
    )
}

export default BuscarPelicula;