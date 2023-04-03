import React, {Fragment, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {I18n, namespaces} from "../../i18n/i18n.constants";
import {languages} from "../../i18n/i18n.constants";
import {useOutsideAlerter} from "../../element/useOutsideAlerter";
import {establecerIdioma} from "../../element/i18Impl";
import {IoLanguage} from "react-icons/all";
import {Parametros} from "../../model/Parametros";

const SelectIdioma = (props: { estado: boolean, exit: Function }) => {
    const home: any = useTranslation(namespaces.pages.home).t;
    const common: any = useTranslation(namespaces.common).t;

    const [btnEstado, setBtnEstado] = useState<boolean>();
    const [idioma, setIdioma] = useState<string>("");
    const select = useRef();

    const style: Object = {
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        color: "#000",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const mapIdioma = () => {
        const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');
        const lista: any = [];
        for (const property in languages) {
            // @ts-ignore
            lista.push(languages[property]);
        }

        return lista.map((item: I18n, index: number) => {
            // @ts-ignore
            return <option selected={params.idioma && params.idioma === item.value} key={index}
                           value={item.value}>{item.label}</option>
        });
    }

    const eventChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        if (e.currentTarget.value !== "") {
            setIdioma(e.currentTarget.value);
            setBtnEstado(true);
        } else {
            setBtnEstado(false);
        }
    }

    const cambiarIdioma = (): void => {
        if (idioma !== "") {
            establecerIdioma(idioma);
            props.exit();
        }
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setBtnEstado(false);
        props.exit();
    });

    useEffect(() => {
        setBtnEstado(false);
    }, []);

    return (props.estado ? <Fragment>
        {/* @ts-ignore */}
        <section style={style} className="min-h-screen flex items-center justify-center shadow-md">
            <div ref={wrapperRef} className="w-full mx-4 p-4 rounded md:w-1/2 lg:w-1/4 bg-white dark:bg-gray-900">
                <div>
                    <div className="flex items-center justify-center">
                        <IoLanguage className="w-10 h-10 text-gray-300 dark:text-gray-700"/>
                    </div>
                </div>
                <div className="mt-1">
                    <h1 className="text-lg font-bold text-gray-700 dark:text-white text-center">{home("title_modal_language")}</h1>
                </div>
                <div className="mx-2 my-1">
                    <h2 className="text-base text-gray-700 dark:text-white">{home("subtitle_modal_language")}</h2>
                    <div className="my-4 text-center m-1">
                        {/* @ts-ignore */}
                        <select ref={select}
                                className="bg-blue-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-indigo-500 w-full"
                                onChange={e => eventChange(e)}>
                            <option value={""} disabled selected>{common("select_index")}</option>
                            {mapIdioma()}
                        </select>
                    </div>

                    <div className="text-center">
                        <button onClick={cambiarIdioma} disabled={!btnEstado}
                                className="bg-gray-700 hover:bg-gray-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60 md:w-2/5 w-full">
                            {home("title_modal_button_language")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </Fragment> : <Fragment/>)
}
export default SelectIdioma;