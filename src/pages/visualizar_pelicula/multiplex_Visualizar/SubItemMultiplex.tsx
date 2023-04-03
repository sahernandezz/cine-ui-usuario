import {Funcion} from "../../../model/Funcion";
import {formatDate} from "../../../element/formatDateSimpleFormat";
import React from "react";
import {useNavigate} from "react-router-dom";

const SubItemMultiplex = (props: { funciones: Funcion[] }) => {
    const navigate: any = useNavigate();

    const addItem = (funcion: Funcion) => {
        if (window.localStorage.getItem('usuario') !== null) {
            window.sessionStorage.setItem("funcion_compra", JSON.stringify(funcion));
            navigate("/compra");
        } else {
            alert("Debe iniciar sesión para comprar");
        }
    }

    return (
        <ul className="flex">
            {props.funciones.map((funcion: Funcion) => (
                <li key={funcion.id} onClick={() => addItem(funcion)}
                    className="bg-white cursor-pointer hover:shadow-lg hover:bg-gray-800 duration-300 hover:-translate-y-1 text-blue-400 hover:text-white p-2 m-1 border border-blue-400 rounded-lg">
                    <h2 className="tracking-widest text-xs title-font font-medium mb-1">
                        {formatDate(funcion.fechaInicio)}</h2>
                </li>
            ))}
        </ul>
    )
}

export default SubItemMultiplex;