import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {BsCheckCircleFill} from "react-icons/all";

const Completado = () => {
    const registroTranslation: any = useTranslation(namespaces.pages.registro).t;

    return (
        <Fragment>
            <div>
                <div className="flex items-center justify-center">
                    <BsCheckCircleFill className="w-10 h-10 text-green-400"/>
                </div>

                <div className="mt-2 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize"
                        id="modal-title">{registroTranslation('successful_registration')}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {registroTranslation('successful_registration_message')}
                    </p>
                </div>
            </div>

            <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                    <button onClick={() => window.location.href = '/'} type="button"
                          className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                        {registroTranslation('successful_registration_btn')}
                    </button>
            </div>
        </Fragment>
    )
}

export default Completado;