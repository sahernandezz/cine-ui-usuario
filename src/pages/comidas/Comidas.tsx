import React from "react";
import {Comida} from "../../model/Comida";
import ItemComida from "./item_comida/ItemComida";
import {CategoriaComida} from "../../model/CategoriaComida";

const Comidas = () => {

    const categoria: CategoriaComida = JSON.parse(window.sessionStorage.getItem('categoria') || '{}');

    return (
        <div className="pt-12 lg:px-28">
            <section>
                {/* title*/}
                <div className="justify-between items center py-3 mx-5 lg:ml-12">
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-1/2 w-full lg:mb-0">
                            <h1 className="sm:text-2xl text-2xl font-medium title-font mb-2 text-gray-900">{categoria.nombre}</h1>
                            <div className="h-1 w-20 bg-gray-900 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="sm:mx-12 mx-5 grid grid-cols-2 sm:grid-cols-4 gap-7 pt-5 mb-16">
                    {categoria.comidas.map((comida: Comida) => {
                        return <ItemComida comida={comida}/>
                    })}
                </div>
            </section>
        </div>
    )
}

export default Comidas;