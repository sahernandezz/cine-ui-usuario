import React, {Fragment} from "react";
import {Comida} from "../../../model/Comida";

const ItemComida = (props: { comida: Comida }) => {

    return (
        <Fragment>
            <div className="bg-white shadow-lg rounded p-3">
                <div className=" shadow-md bg-white rounded">
                    <img className="w-full lg:w-full"
                         src={props.comida.imagen}
                         alt={props.comida.nombre}/>
                </div>
                    <div className="pt-3 pb-1 lg:mx-6 mx-1">
                    <span className="text-xl font-semibold text-gray-800">
                        {props.comida.nombre}
                    </span>
                        <p className="text-gray-500 text-sm">{props.comida.descripcion}</p>
                    </div>
            </div>
        </Fragment>
    )
}

export default ItemComida;