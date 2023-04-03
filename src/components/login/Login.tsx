import React, {Fragment, useRef, useState} from "react";
import {useOutsideAlerter} from "../../element/useOutsideAlerter";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {Link} from "react-router-dom";
import {Auth} from "../../model/Auth";
import {userLogin} from "../../service/authenticationService";
import {Usuario} from "../../model/Usuario";
import {puntosPorUsuario} from "../../service/UsuarioServiceImpl";
import {cerrarSesion} from "../../element/user";

const Login = (props: { estado: boolean, exit: Function }) => {

    const login: any = useTranslation(namespaces.pages.login).t;
    const correo: any = useRef("");
    const clave: any = useRef("");

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

    const errorStyle: string = "block w-full px-4 py-2 mt-2 text-gray-200 " +
        "border rounded bg-gray-800 border-red-600 placeholder-gray-400 " +
        "focus:border-red-300 focus:ring-opacity-40 focus:outline-none " +
        "focus:ring focus:ring-red-300";

    const loginQuery = async (auth: Auth) => {
        await userLogin(auth).then((response: any) => {
            window.localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            window.localStorage.setItem('USER_KEY', response.data.token);
            puntosPorUsuarioQuery().then((data: number) => {
                const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}');
                usuario.pt = Number.parseInt(String(data)) > 0 ? data : 0;
                window.localStorage.setItem('usuario', JSON.stringify(usuario));
            });
            props.exit();
        }).catch((error: any) => {
            correo.current.className = errorStyle;
            clave.current.className = errorStyle;
        });
    }

    const puntosPorUsuarioQuery = async () => {
        const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}');
        return await puntosPorUsuario(usuario).then((response: any) => {
            return response.data;
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    const loginAction = (e: any) => {
        e.preventDefault();
        if (correo.current.value !== "" && clave.current.value !== "") {
            loginQuery({
                correo: correo.current.value,
                clave: clave.current.value
            }).then(() => null);
        }
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        props.exit();
    });

    return (props.estado ?
            <section style={style} className="min-h-screen flex items-center justify-center shadow-md">
                <div ref={wrapperRef}
                     className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded shadow-md dark:bg-gray-900">
                    <div className="px-6 py-10">
                        <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">{login("title")}</h2>

                        <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">{login("sub_title")}</h3>

                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">{login("sub_title_2")}</p>

                        <form onSubmit={e => loginAction(e)}>
                            <div className="w-full mt-4">
                                <input ref={correo} required={true}
                                       className="block w-full px-4 py-2 mt-2 text-gray-200 border rounded bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                       type="email" placeholder={login("email")} aria-label="Email Address"/>
                            </div>

                            <div className="w-full mt-4">
                                <input ref={clave} required={true}
                                       className="block w-full px-4 py-2 mt-2 text-gray-200 border rounded bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                       type="password" placeholder={login("password")} aria-label="Password"/>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-gray-600 dark:text-gray-200 hover:text-blue-400"></span>

                                <button
                                    className="px-4 py-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                                    type="submit">{login("btn_login")}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">{login("dont_have_account")}</span>
                        <Link onClick={() => props.exit()} to="/registrar"
                              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">{login("register")}</Link>
                    </div>
                </div>
            </section> : <Fragment/>
    )
}

export default Login;