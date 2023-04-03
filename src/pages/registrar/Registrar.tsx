import React, {Fragment, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {listaTipoDocumento} from "../../service/TipoDocumentoServiceImpl";
import {Parametros} from "../../model/Parametros";
import {TipoDocumento} from "../../model/TipoDocumento";
import {Usuario} from "../../model/Usuario";
import {registrarUsuario} from "../../service/UsuarioServiceImpl";
import LoadFullV2 from "../../components/load/load_full_v2/LoadFullV2";
import Modal from "../../components/modal/Modal";
import Completado from "./Completado";
import Error from "./Error";

const Registrar = () => {
    const registroTranslation: any = useTranslation(namespaces.pages.registro).t;
    const common: any = useTranslation(namespaces.common).t;
    const [loadingEstado, setLoadingEstado] = useState<boolean>(false);
    const [tipoDocumentos, setTipoDocumentos] = useState<TipoDocumento[]>([]);
    const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');
    const [modalEstado, setModalEstado] = useState<boolean>(false);
    const [modalOpcional, setModalOpcional] = useState<boolean>(false);
    const [modalComponent, setModalComponent] = useState<any>();

    const nombre = useRef<string>() as any;
    const apellido = useRef<string>() as any;
    const telefono = useRef<string>() as any;
    const correo = useRef<string>() as any;
    const tipoDocumento = useRef<string>() as any;
    const numeroDocumento = useRef<string>() as any;
    const clave = useRef<string>() as any;
    const confirmarClave = useRef<string>() as any;
    const direccion = useRef<string>() as any;

    const listaTipoDocumentoQuery = async () => {
        await listaTipoDocumento(params.pais).then((response: any) => {
            let data: TipoDocumento[] = response.data;
            setTipoDocumentos(data);
        });
    }

    const mapTipoDocumento = () => {
        return tipoDocumentos.map((item: TipoDocumento) => {
            return <option key={item.id}
                           value={JSON.stringify(item)}>{item.nombre}</option>
        });
    }

    const errorModal = (mensaje: string) => {
        setModalEstado(true);
        setModalOpcional(false);
        setModalComponent(<Error mensage={mensaje}
                                 exit={() => setModalEstado(false)}/>);
    }

    const registrarUsuarioQuery = async (usuario: Usuario) => {
        await registrarUsuario(usuario).then((response: any) => {
            setLoadingEstado(false);
            if (response.status === 200) {
                setModalEstado(true);
                setModalOpcional(false);
                setModalComponent(<Completado/>);
            }else {
                errorModal(registroTranslation('registration_did_not_work'));
            }
        }).catch((error: any) => {
            setLoadingEstado(false);
            errorModal(registroTranslation('registration_did_not_work'));
        });
    }

    const validarFormulario = (e: any) => {
        e.preventDefault();
        if (clave.current.value === confirmarClave.current.value) {
            setLoadingEstado(true);
            registrarUsuarioQuery({
                id: null,
                nombre: nombre.current.value,
                apellido: apellido.current.value,
                telefono: telefono.current.value,
                correo: correo.current.value,
                tipoDocumento: JSON.parse(tipoDocumento.current.value),
                numeroDocumento: numeroDocumento.current.value,
                clave: clave.current.value,
                pt: null,
                direccion: direccion.current.value
            }).then(() => null);
        } else {
            errorModal(registroTranslation('password_not_font'));
        }
    }

    useEffect(() => {
        listaTipoDocumentoQuery().then(() => null);
    }, []);

    return (
        <Fragment>
            <section className="flex justify-center py-16">
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                            {registroTranslation('title')}
                        </h1>

                        <p className="mt-4 text-gray-500">
                            {registroTranslation('description')}
                        </p>

                        <form onSubmit={e => validarFormulario(e)}
                              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label
                                    className="block mb-2 text-sm text-gray-600">{registroTranslation('name')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <input type="text" placeholder={registroTranslation('name')} required={true}
                                       ref={nombre}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm text-gray-600">{registroTranslation('last_name')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <input type="text" placeholder={registroTranslation('last_name')} required={true}
                                       ref={apellido}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600">{registroTranslation('phone')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <input type="number" placeholder="XXX-XX-XXXX-XXX" required={true} min={0}
                                       ref={telefono}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600">{registroTranslation('email')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <input type="email" placeholder="johnsnow@example.com" required={true} ref={correo}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm text-gray-600">{registroTranslation('type_document')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <select required={true} ref={tipoDocumento}
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                                    <option value={""}>{common("select_index")}</option>
                                    {mapTipoDocumento()}
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm text-gray-600">{registroTranslation('number_document')}<span
                                    className="text-red-900 text-xl"> *</span></label>
                                <input type="number" placeholder="XXXXXXXXX" required={true} min={0}
                                       ref={numeroDocumento}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
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
                            <div>
                                <label
                                    className="block mb-2 text-sm text-gray-600">{registroTranslation('address')}</label>
                                <input type="text" placeholder="XXX-XX" ref={direccion}
                                       className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div/>
                            <button
                                type="submit"
                                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                <span>{registroTranslation('btn_register')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <LoadFullV2 estado={loadingEstado}/>
            <Modal estado={modalEstado} exit={() => setModalEstado(false)} opcional={modalOpcional}
                   component={modalComponent}/>
        </Fragment>
    )
}

export default Registrar;