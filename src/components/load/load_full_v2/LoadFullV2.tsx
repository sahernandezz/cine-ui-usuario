import {Fragment} from "react";
import Load from "../Load";

const LoadFullV2 = (props: { estado: boolean }) => {

    const style: Object = {
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (props.estado ?
            <div style={style}>
                <Load/>
            </div>
            : <Fragment/>
    )
}

export default LoadFullV2;