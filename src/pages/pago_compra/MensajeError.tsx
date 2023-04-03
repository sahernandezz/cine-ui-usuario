import React, {Fragment} from "react";
import {IoCloseCircleSharp} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";

const MensajeError = (props: { exit: Function}) => {
    const registroTranslation: any = useTranslation(namespaces.pages.compra).t;

    return (
        <Fragment>
            <div>
                <div className="flex items-center justify-center">
                    <IoCloseCircleSharp className="w-10 h-10 text-red-400"/>
                </div>

                <div className="mt-2 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize"
                        id="modal-title">{registroTranslation('mensaje_error.title')}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {registroTranslation('mensaje_error.message')}
                    </p>
                </div>
            </div>

            <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                <button onClick={() => props.exit()}
                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                    {registroTranslation('mensaje_error.btn_continuar')}
                </button>
            </div>
        </Fragment>
    )
}

export default MensajeError;