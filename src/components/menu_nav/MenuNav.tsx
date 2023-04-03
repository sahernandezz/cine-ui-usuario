import {Fragment, useRef} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {Link, useNavigate} from "react-router-dom";
import DesplegableUsuario from "./desplegable_usuario/DesplegableUsuario";

const MenuNav = () => {
    const common: any = useTranslation(namespaces.common).t;
    const menu_nav: any = useTranslation(namespaces.pages.menu_nav).t;
    const buscarTitulo = useRef() as any;
    const navigate = useNavigate();

    const style_menu_nav = {
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 99,
        transition: "all 0.3s ease-in-out"
    }

    const buscar = () => {
        const titulo = buscarTitulo.current.value;
        if (titulo !== "" && titulo !== null) {
            navigate("/buscar/" + titulo);
        } else {
            navigate('/');
        }
    }

    return (
        <Fragment>
            {/* @ts-ignore */}
            <div style={style_menu_nav}
                 className="w-full bg-gray-800 p-4 grid md:grid-cols-12 gap-4 items-center justify-center">
                <span onClick={() => {
                    window.location.href = '/';
                }}
                      className="md:col-span-2 flex text-white justify-center md:justify-start font-bold cursor-pointer text-3xl">
                    {common("title")}
                </span>
                <div className="md:col-span-4 flex items-center justify-center gap-2">
                    <input ref={buscarTitulo} type="text"
                           className="w-full dark:bg-gray-200 outline-none p-2 rounded dark:focus:bg-gray-100 dark:focus:shadow-lg"
                           placeholder={menu_nav("search")}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-100 cursor-pointer hover:text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        onClick={buscar}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <nav className="md:col-span-6 flex items-center gap-4 justify-end text-white">
                    <Link
                        to={`/catelera`}
                        className="xl:py-1 xl:px-2 rounded hover:bg-gray-100 transition-colors hover:text-gray-800"
                    >
                        {menu_nav("billboard")}
                    </Link>
                    <Link
                        to={`/proximamente`}
                        className="xl:py-1 xl:px-2 rounded hover:bg-gray-100 transition-colors hover:text-gray-800"
                    >
                        {menu_nav("soon")}
                    </Link>
                    <Link
                        to={`/comidas`}
                        className="xl:py-1 xl:px-2 rounded hover:bg-gray-100 transition-colors hover:text-gray-800"
                    >
                        {menu_nav("foods")}
                    </Link>
                    <div
                        className="xl:py-1 xl:px-2 rounded hover:color-gray-100 transition-colors"
                    >
                        <DesplegableUsuario/>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}
export default MenuNav;