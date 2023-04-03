import React, {Fragment, useRef} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import {Usuario} from "../../../model/Usuario";
import {cambiarClaveUsuario} from "../../../service/UsuarioServiceImpl";
import {cerrarSesion} from "../../../element/user";

const Clave = (props: { usuario: Usuario }) => {
    const registroTranslation: any = useTranslation(namespaces.pages.registro).t;
    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;

    const clave = useRef<string>() as any;
    const confirmarClave = useRef<string>() as any;

    const cambiarClaveQuery = async (id: number | null, clave: string) => {
        await cambiarClaveUsuario({id: id, clave: clave}).then((response: any) => {
            if (response.status === 200) {
                cerrarSesion();
            }
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const cambiarClave = (e: any) => {
        e.preventDefault();
        if (clave.current.value === confirmarClave.current.value) {
            cambiarClaveQuery(props.usuario.id, clave.current.value).then(() => null);
        } else {
            alert("Las claves no coinciden");
        }
    }

    return (
        <Fragment>
            <h1 className="text-xl">{perfilTranslation('change_password')}</h1>
            <form onSubmit={e => cambiarClave(e)}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-6">
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('password')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="password" placeholder={registroTranslation('password')} required={true}
                           minLength={8}
                           ref={clave}
                           className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('confirm_password')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="password" placeholder={registroTranslation('confirm_password')}
                           required={true}
                           minLength={8} ref={confirmarClave}
                           className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <button
                    type="submit"
                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>{perfilTranslation('btn_change_password')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-5 h-5 rtl:-scale-x-100"
                         viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </form>
        </Fragment>
    )
}

export default Clave;