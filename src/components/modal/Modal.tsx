import React, {Fragment, useRef} from "react";
import {useOutsideAlerter} from "../../element/useOutsideAlerter";

const Modal = (props: { estado: boolean, exit: Function, opcional: boolean, component: any }) => {

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

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        props.exit();
    });

    return (props.estado ?
            <div style={style} className="min-h-screen flex items-center justify-center shadow-md">
                <div ref={props.opcional ? wrapperRef : null}
                     className="relative text-center mx-5 inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded shadow-xl rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    {props.component}
                </div>
            </div> : <Fragment/>
    )
}

export default Modal;