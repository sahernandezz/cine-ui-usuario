import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Usuario} from "../../model/Usuario";
import {TipoDocumento} from "../../model/TipoDocumento";
import {listaTipoDocumento} from "../../service/TipoDocumentoServiceImpl";
import Informacion from "./Informacion/Informacion";
import Clave from "./clave/Clave";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {FiUser, RiShieldKeyholeLine} from "react-icons/all";
import {facturasComida, facturasFuncion} from "../../service/UsuarioServiceImpl";
import {FacturaComida} from "../../model/FacturaComida";
import {cerrarSesion} from "../../element/user";
import TablaCompras from "./tabla_compras/TablaCompras";
import {FacturaFuncion} from "../../model/FacturaFuncion";
import {formatName} from "../../element/formatName";


const Perfil = () => {
    const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}');

    const [open, setOpen] = useState<boolean>(false);
    const [component, setComponent] = useState<any>();
    const [tipoDocumentos, setTipoDocumentos] = useState<TipoDocumento[]>([]);
    const [facturasComidas, setFacturasComidas] = useState<FacturaComida[]>([]);
    const [facturasFunciones, setFacturasFunciones] = useState<FacturaFuncion[]>([]);

    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;

    const listaTipoDocumentoQuery = async () => {
        await listaTipoDocumento(usuario.tipoDocumento?.pais).then((response: any) => {
            let data: TipoDocumento[] = response.data;
            setTipoDocumentos(data);
        });
    }

    const listaFacturasComidaQuery = async () => {
        await facturasComida(usuario).then((response: any) => {
            let data: FacturaComida[] = response.data;
            setFacturasComidas(data);
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const listaFacturasFuncionQuery = async () => {
        await facturasFuncion(usuario).then((response: any) => {
            let data: FacturaFuncion[] = response.data;
            setFacturasFunciones(data);
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const openComponentInfo = () => {
        setOpen(true);
        setComponent(<Informacion usuario={usuario} tipoDocumentos={tipoDocumentos}
                                  exit={() => setOpen(false)}/>);
    }

    const openComponentClave = () => {
        setOpen(true);
        setComponent(<Clave usuario={usuario}/>);
    }

    useEffect(() => {
        listaFacturasComidaQuery().then(() => null);
        listaFacturasFuncionQuery().then(() => null);
        listaTipoDocumentoQuery().then(() => null);
    }, []);

    return (
        <Fragment>
            <div className="pt-12">
                <section className="text-gray-600 text-4xl font-semibold leading-normal mx-8">
                    <div className="container px-5 pt-8 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{formatName(usuario.nombre) + " " + formatName(usuario.apellido)}</h1>
                            <div className="text-2xl">
                                {
                                    usuario.pt !== undefined ? <div className="d-flex">
                                        <label>{perfilTranslation("points")}: </label>
                                        <span>{usuario.pt + " pt"}</span>
                                    </div> : <Fragment/>
                                }
                                <section className="text-gray-600 body-font">
                                    <div className="container px-5 mx-auto mt-8">
                                        <div className="flex flex-wrap -m-4">
                                            <div className="xl:w-1/3 md:w-1/2 p-4">
                                                <div onClick={() => openComponentInfo()}
                                                     className="cursor-pointer p-6 rounded bg-white hover:shadow-lg text-gray-900 duration-300 hover:-translate-y-2">
                                                    <div
                                                        className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                                                        <FiUser/>
                                                    </div>
                                                    <h2 className="text-lg font-medium title-font mb-2">{perfilTranslation("change_information")}</h2>
                                                </div>
                                            </div>
                                            <div className="xl:w-1/3 md:w-1/2 p-4">
                                                <div onClick={() => openComponentClave()}
                                                     className="cursor-pointer p-6 rounded bg-white hover:shadow-lg text-gray-900 duration-300 hover:-translate-y-2">
                                                    <div
                                                        className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                                                        <RiShieldKeyholeLine/>
                                                    </div>
                                                    <h2 className="text-lg font-medium title-font mb-2">{perfilTranslation("change_password")}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-gray-600 text-4xl font-semibold leading-normal md:mx-14">
                    <div className="container px-5 mx-auto">
                        <div className="flex flex-col w-full mb-20">
                            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">{perfilTranslation('purchases')}</h1>
                            <TablaCompras facturasFuncion={facturasFunciones} facturasAlimentos={facturasComidas}/>
                        </div>
                    </div>
                </section>

                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-in-out duration-500"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in-out duration-500"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div
                                                    className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 mt-20">
                                                    <button
                                                        type="button"
                                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            <div
                                                className="flex h-full flex-col overflow-y-scroll mt-20 bg-white md:py-6 py-20 shadow-xl px-8">
                                                {component}
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </Fragment>
    )
}

export default Perfil;