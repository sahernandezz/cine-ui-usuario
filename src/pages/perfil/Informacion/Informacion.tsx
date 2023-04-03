import React, {Fragment, useRef} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import {Usuario} from "../../../model/Usuario";
import {TipoDocumento} from "../../../model/TipoDocumento";
import {cambiarInfoUsuario} from "../../../service/UsuarioServiceImpl";
import {cerrarSesion} from "../../../element/user";

const Informacion = (props: { usuario: Usuario, tipoDocumentos: TipoDocumento[], exit: Function }) => {

    const registroTranslation: any = useTranslation(namespaces.pages.registro).t;
    const common: any = useTranslation(namespaces.common).t;
    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;

    const nombre = useRef<string>() as any;
    const apellido = useRef<string>() as any;
    const telefono = useRef<string>() as any;
    const correo = useRef<string>() as any;
    const tipoDocumento = useRef<string>() as any;
    const numeroDocumento = useRef<string>() as any;
    const direccion = useRef<string>() as any;

    const mapTipoDocumento = () => {
        return props.tipoDocumentos.map((item: TipoDocumento) => {
            return <option key={item.id} selected={item.id === props.usuario.tipoDocumento.id}
                           value={JSON.stringify(item)}>{item.nombre}</option>
        });
    }

    const cambiarInfoUsuarioQuery = async (
        id: number | null, nombre: string, apellido: string, telefono: string, correo: string,
        tipoDocumento: TipoDocumento, numeroDocumento: string, direccion: string) => {
        await cambiarInfoUsuario(
            {
                id: id, nombre: nombre, apellido: apellido, telefono: telefono,
                correo: correo, tipoDocumento: tipoDocumento, numeroDocumento: numeroDocumento,
                direccion: direccion
            }
        ).then((response: any) => {
            if (response.status === 200) {
                if (props.usuario.correo !== correo) {
                    cerrarSesion();
                } else {
                    window.localStorage.setItem("usuario", JSON.stringify(response.data));
                    props.exit();
                }
            }
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const cambiarInformacion = (e: any) => {
        e.preventDefault();
        cambiarInfoUsuarioQuery(props.usuario.id, nombre.current.value, apellido.current.value,
            telefono.current.value, correo.current.value, JSON.parse(tipoDocumento.current.value),
            numeroDocumento.current.value, direccion.current.value).then(() => null);
    }

    return (
        <Fragment>
            <h1 className="text-xl">{perfilTranslation("update_information")}</h1>
            <form onSubmit={e => cambiarInformacion(e)}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-6">
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('name')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="text" placeholder={registroTranslation('name')}
                           required={true}
                           defaultValue={props.usuario.nombre}
                           ref={nombre}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>

                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('last_name')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="text"
                           placeholder={registroTranslation('last_name')}
                           defaultValue={props.usuario.apellido}
                           required={true}
                           ref={apellido}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>

                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('phone')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="number" placeholder="XXX-XX-XXXX-XXX"
                           required={true} min={0}
                           defaultValue={props.usuario.telefono}
                           ref={telefono}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>

                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('email')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="email" placeholder="johnsnow@example.com"
                           required={true} ref={correo}
                           defaultValue={props.usuario.correo}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('type_document')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <select required={true}
                            ref={tipoDocumento}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                        <option value={""} selected disabled>{common("select_index")}</option>
                        {mapTipoDocumento()}
                    </select>
                </div>
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('number_document')}<span
                        className="text-red-900 text-xl"> *</span></label>
                    <input type="number" placeholder="XXXXXXXXX" required={true}
                           min={0}
                           defaultValue={props.usuario.numeroDocumento}
                           ref={numeroDocumento}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div>
                    <label
                        className="block mb-2 text-sm text-gray-600">{registroTranslation('address')}</label>
                    <input type="text" placeholder="XXX-XX" ref={direccion}
                           defaultValue={props.usuario.direccion}
                           className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div/>
                <button
                    type="submit"
                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>{perfilTranslation('btn_update')}</span>
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

export default Informacion;