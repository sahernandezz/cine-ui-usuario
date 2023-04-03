import {Fragment} from "react";

const Etiqueta = (props: { texto: string }) => {

    return (
        <Fragment>
            <span className="text-gray-500 text-gray-800 bg-gray-400 p-1 rounded text-xs">
                {props.texto}
            </span>
        </Fragment>
    )
}
export default Etiqueta;