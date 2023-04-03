import React, {Fragment, useState, useRef} from "react";
import {useOutsideAlerter} from "../../../element/useOutsideAlerter"
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import {Usuario} from "../../../model/Usuario";
import {Parametros} from "../../../model/Parametros";
import SelectParametros from "../../select_parametros/SelectParametros";
import {i18n} from "../../../i18n/i18n";
import SelectIdioma from "../../select_idioma/SelectIdioma";
import {CgLogIn, CgLogOut, IoLanguage, TbDiamond, TiLocation} from "react-icons/all";
import Login from "../../login/Login";
import {Link} from "react-router-dom";
import {formatName} from "../../../element/formatName";

const DesplegableUsuario = () => {

    const style_desplegable_off = {
        visibility: "hidden",
        pointerEvents: "none"
    }

    const style_desplegable_on = {
        visibility: "visible",
        pointerEvents: "all"
    }

    const [style, setStyle] = useState<Object>(style_desplegable_off);
    const [estadoComponent, setEstadoComponent] = useState<boolean>(false);
    const [estadoParametros, setEstadoParametros] = React.useState<boolean>(false);
    const [estadoIdioma, setEstadoIdioma] = React.useState<boolean>(false);
    const [estadoLogin, setEstadoLogin] = React.useState<boolean>(false);

    const menuNavTranslation: any = useTranslation(namespaces.pages.menu_nav).t;
    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;

    const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}');
    const parametros: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');


    const handleDesplegable = () => {
        if (estadoComponent) {
            setStyle(style_desplegable_off);
            setEstadoComponent(false);
        } else {
            setStyle(style_desplegable_on);
            setEstadoComponent(true);
        }
    }

    const openSelectRegion = () => {
        setEstadoComponent(false);
        setEstadoParametros(true);
        handleDesplegable();
    }

    const openSelectIdioma = () => {
        setEstadoComponent(false);
        setEstadoIdioma(true);
        handleDesplegable();
    }

    const openLogin = () => {
        setEstadoComponent(false);
        setEstadoLogin(true);
        handleDesplegable();
    }

    const off = () => {
        setStyle(style_desplegable_off);
        setEstadoComponent(false);
    }

    const cerrarSesion = () => {
        window.localStorage.removeItem('usuario');
        window.localStorage.removeItem('USER_KEY');
        window.location.href = '/';
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, off);

    return (
        <Fragment>
            <section className="bg-gray-800 text-white" ref={wrapperRef}>
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-auto md:order-2 order-3 mt-3 md:mt-0">
                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button" onClick={handleDesplegable}
                                            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none"
                                            id="user-menu" aria-label="User menu" aria-haspopup="true">
                                        <img className="h-8 w-8 rounded-full"
                                             src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                             alt="img-profile"/>

                                    </button>
                                </div>
                                <div style={style}
                                     className="origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg">
                                    <ul className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu">
                                        {
                                            usuario.correo !== undefined ?
                                                <Fragment>
                                                    <Link to="/perfil" onClick={off}
                                                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                          role="menuitem">
                                                        <div className="mx-1">
                                                            <h1 className="text-sm font-semibold text-gray-700">{formatName(usuario.nombre) + " " + formatName(usuario.apellido)}</h1>
                                                            <p className="text-sm text-gray-500">{usuario.correo}</p>
                                                        </div>
                                                    </Link>
                                                    <hr className="border-gray-200"/>
                                                    <li
                                                        className="flex items-center p-3 text-sm text-gray-600 capitalize text-gray-400"
                                                        role="menuitem">
                                                        <TbDiamond className="w-5 h-5 mx-1"/>
                                                        <h2 className="text-sm font-semibold">{perfilTranslation("points")}: <span
                                                            className="text-blue-400">{usuario.pt} pt</span></h2>
                                                    </li>
                                                    <hr className="border-gray-200"/>
                                                </Fragment>
                                                : null
                                        }
                                        <li onClick={openSelectRegion}
                                            className="cursor-pointer flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                                            role="menuitem">
                                            <TiLocation className="w-5 h-5 mx-1"/>
                                            <span className="mx-1">{menuNavTranslation("change_region")}</span>
                                        </li>
                                        <li onClick={openSelectIdioma}
                                            className="cursor-pointer flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                                            role="menuitem">
                                            <IoLanguage className="w-5 h-5 mx-1"/>
                                            <span className="mx-1">{menuNavTranslation("change_language")}</span>
                                        </li>
                                        {
                                            usuario.correo !== undefined ?
                                                <li onClick={cerrarSesion}
                                                    className="cursor-pointer flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                                                    role="menuitem">
                                                    <CgLogOut className="w-5 h-5 mx-1"/>
                                                    <span className="mx-1">{menuNavTranslation("logout")}</span>
                                                </li>
                                                :
                                                <li onClick={openLogin}
                                                    className="cursor-pointer flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                                                    role="menuitem">
                                                    <CgLogIn className="w-5 h-5 mx-1"/>
                                                    <span className="mx-1">{menuNavTranslation("log_in")}</span>
                                                </li>
                                        }
                                        <hr className="border-gray-200"/>
                                        {/*@ts-ignore*/}
                                        <li className="block px-4 py-2 text-sm text-gray-400"
                                            role="menuitem">  {parametros.ciudad !== undefined ? parametros.ciudad.nombre + " - " + i18n.language : null}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*modals*/}
            <SelectParametros estado={estadoParametros} opcional={true} exit={() => setEstadoParametros(false)}/>
            <SelectIdioma estado={estadoIdioma} exit={() => setEstadoIdioma(false)}/>
            <Login estado={estadoLogin} exit={() => setEstadoLogin(false)}/>
        </Fragment>
    )
}

export default DesplegableUsuario;