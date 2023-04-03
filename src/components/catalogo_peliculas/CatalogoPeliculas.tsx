import React, {Fragment} from "react";
import ItemPelicula from "./item_pelicula/ItemPelicula";
import {Pelicula} from "../../model/Pelicula";
import LoadFullV1 from "../load/load_full_v1/LoadFullV1";

const CatalogoPeliculas = (props: { titulo: string, peliculas: Pelicula[], loading: boolean }) => {

    return (
        <Fragment>
            {/* title*/}
            <section className="pb-16">
                <div className="justify-between items center py-3 mx-5 lg:ml-12">
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-1/2 w-full lg:mb-0">
                            <h1 className="sm:text-2xl text-2xl font-medium title-font mb-2 text-gray-900">{props.titulo}</h1>
                            <div className="h-1 w-20 bg-gray-900 rounded"></div>
                        </div>
                    </div>
                </div>
                {/* items*/}
                {
                    props.loading ? <LoadFullV1/> :
                        <div className="sm:mx-12 mx-5 grid grid-cols-1 sm:grid-cols-4 gap-6 pt-5">
                            {props.peliculas.map((item) => {
                                return <ItemPelicula key={item.id} pelicula={item}/>
                            })}
                        </div>
                }
            </section>
        </Fragment>
    )
}

export default CatalogoPeliculas;