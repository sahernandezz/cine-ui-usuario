import React, {Fragment} from "react";
import {CategoriaComida} from "../../../model/CategoriaComida";
import {Link} from "react-router-dom";

const ItemCategoria = (props: { categoria: CategoriaComida }) => {

    const agregarComidas = () => {
        window.sessionStorage.setItem('categoria', JSON.stringify(props.categoria));
    }

    return (
        <Fragment>
            <Link onClick={agregarComidas} to={`/comidas/${props.categoria.nombre}`}
                  className="bg-white rounded shadow-lg">
                <img className="w-full lg:w-full bg-white rounded"
                     src={props.categoria.imagen}
                     alt={props.categoria.nombre}
                     style={{transition: "all 0.15s ease 0s"}}/>
                <br/>
                <div className="items-center">
                     <span className=" ml-2 text-xl font-semibold text-gray-800">
                        {props.categoria.nombre}
                    </span>
                </div>
            </Link>
        </Fragment>
    )
}

export default ItemCategoria;