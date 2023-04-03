import React, {Fragment, useEffect, useState} from "react";
import {CategoriaComida} from "../../model/CategoriaComida";
import {listaCategoriaComidaPorPais} from "../../service/ComidaService";
import ItemCategoria from "./item_categoria/ItemCategoria";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import PortadaCategoria from "./portada_categoria/PortadaCategoria";
import {Parametros} from "../../model/Parametros";
import LoadFullV1 from "../../components/load/load_full_v1/LoadFullV1";

const Categorias = () => {

    const [categorias, setCategorias] = useState<CategoriaComida[]>([]);
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');
    const comidasTranslation: any = useTranslation(namespaces.pages.comidas).t;
    const [loading, setLoading] = useState(true);

    const listaCategoriasQuery = async () => {
        await listaCategoriaComidaPorPais(params.pais === undefined ? 1 : params.pais.id).then((response: any) => {
            let data: CategoriaComida[] = response.data;
            setCategorias(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        listaCategoriasQuery().then(() => null);
    }, []);

    return (
            <div className="pt-12 lg:px-28 pb-16">
                <PortadaCategoria/>
                <section>
                    {/* title*/}
                    <div className="justify-between items center mx-5 lg:ml-12">
                        <div className="flex flex-wrap w-full">
                            <div className="lg:w-1/2 w-full lg:mb-0">
                                <h1 className="sm:text-2xl text-2xl font-medium title-font mb-2 text-gray-900">{comidasTranslation("title")}</h1>
                                <div className="h-1 w-20 bg-gray-900 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* items */}
                    {
                        loading ? <LoadFullV1/> :
                            <Fragment>
                                <div className="lg:mx-12 mx-5 grid grid-cols-2 sm:grid-cols-5 gap-5 pt-5 mb-16">
                                    {categorias.map((categoria: CategoriaComida) => {
                                        return <ItemCategoria key={categoria.id} categoria={categoria}/>
                                    })}
                                </div>
                                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center">
                                    {comidasTranslation("description_3")}</p>

                            </Fragment>

                    }
                </section>
            </div>
    )
}

export default Categorias;