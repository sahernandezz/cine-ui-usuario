import {useState} from "react";
import {Silla} from "../../model/Silla";
import {alphabetIndex} from "../../element/alphabet";

const ItemSilla = (props: { silla: Silla, add: Function, estado: boolean }) => {

    const [select, setSelect] = useState<boolean>(props.silla.select);

    const asignarSilla = (sillaAux: Silla) => {
        if (!props.estado || select) {
            sillaAux.select = !sillaAux.select;
            setSelect(sillaAux.select);
            props.add(sillaAux);
        }
    }

    return (
        <div>
            <button onClick={() => asignarSilla(props.silla)}
                    disabled={props.silla.estado}
                    style={{
                        backgroundColor: props.silla.estado ? "rgb(28,101,204)" : select ? "rgb(28,204,131)" : "rgb(241,241,241)",
                        color: props.silla.estado ? "rgb(255,255,255)" : select ? "rgb(255,255,255)" : "rgb(0,0,0)",
                        width: "32px",
                        border: "1px solid rgb(210,210,211)",
                        height: "32px",
                        borderRadius: "50%"
                    }}
                    className={!props.silla.estado ? (select ? "" : props.estado
                        ? "pointer-events-none" : "duration-300 hover:-translate-y-1") : ""}>{alphabetIndex(props.silla.columna)}</button>
        </div>
    )
}

export default ItemSilla;