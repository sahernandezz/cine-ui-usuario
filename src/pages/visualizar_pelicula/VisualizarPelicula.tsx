import React, {Fragment} from "react";
import {Pelicula} from "../../model/Pelicula";
import PortadaVisializacion from "./portada_visualizar/PortadaVisializacion";
import MultiplexVisualizar from "./multiplex_Visualizar/MultiplexVisualizar";
import TrailerVisualizar from "./trailer_visualizar/TrailerVisualizar";

const VisualizarPelicula = () => {

    const pelicula: Pelicula = JSON.parse(window.sessionStorage.getItem('visualizar_pelicula') || '{}');

    return (
        <Fragment>
            {/*Contenido*/}
                <PortadaVisializacion pelicula={pelicula}/>
                <div className="white ld:py-8 mb-16">
                    <div className="container text-gray-600 md:px-12 px-2">
                        <div className="grid lg:grid-cols-2">
                            <TrailerVisualizar pelicula={pelicula}/>
                            {/* MultiplexVisualizar */}
                            <MultiplexVisualizar pelicula={pelicula}/>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default VisualizarPelicula;