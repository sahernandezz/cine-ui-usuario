import React, {Fragment, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {Pais} from "../../model/Pais";
import {Ciudad} from "../../model/Ciudad";
import {listaCiudadesPorPais} from "../../service/CiudadServiceImpl";
import {i18n} from "../../i18n/i18n";
import {useOutsideAlerter} from "../../element/useOutsideAlerter";
import {listaPaises} from "../../service/PaisServiceImpl";
import {TiLocation} from "react-icons/all";
import {Parametros} from "../../model/Parametros";

const SelectParametros = (props: { estado: boolean, opcional: boolean, exit: Function }) => {
    const home: any = useTranslation(namespaces.pages.home).t;
    const common: any = useTranslation(namespaces.common).t;

    const [title, setTitle] = useState<any>();
    const [subtitle, setSubtitle] = useState<any>();
    const [button, setButton] = useState<any>();
    const [pais, setPais] = useState<Pais>();
    const [ciudad, setCiudad] = useState<Ciudad>();
    const [estado, setEstado] = useState<boolean>();
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [paises, setPaises] = useState<Pais[]>([]);
    const [btnEstado, setBtnEstado] = useState<boolean>();
    const select = useRef();

    const asignarParams = (pais: Pais | undefined, ciudad: Ciudad | undefined) => {
        window.localStorage.setItem('params', JSON.stringify({
            pais: pais,
            ciudad: ciudad,
            idioma: i18n.language
        }));
    }

    const listaPaisesQuery = async () => {
        await listaPaises().then((response: any) => {
            let data: Pais[] = response.data;
            setPaises(data);
        });
    }

    const listaCiudadesQuery = async (pais: Pais) => {
        await listaCiudadesPorPais(pais).then((response: any) => {
            let data: Ciudad[] = response.data;
            setCiudades(data);
        });
    }

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

    const nextCiudad = () => {
        let selectEvent: any = select.current;
        if (selectEvent.value !== "") {
            asignarParams(pais, ciudad);
            location.reload();
        }
    }

    const nextPais = () => {
        let selectEvent: any = select.current;
        if (selectEvent.value !== "") {
            setTitle(home("title_modal_ciudad"));
            setSubtitle(home("subtitle_modal_ciudad"));
            setButton(home("title_modal_button_ciudad"));
            setEstado(true);
            setBtnEstado(false);
            selectEvent.value = "";
            if (pais) {
                listaCiudadesQuery(pais).then(r => null);
            }
        }
    }

    const eventChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value !== "") {
            if (estado) {
                setCiudad(JSON.parse(e.currentTarget.value));
            } else {
                setPais(JSON.parse(e.currentTarget.value));
            }
            setBtnEstado(true);
        } else {
            setBtnEstado(false);
        }
    }

    const mapPaises = (paises: Pais[]) => {
        const params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');
        return paises.map((item: Pais) => {
            return <option key={item.id}
                           selected={params.pais && params.pais.id === item.id}
                           value={JSON.stringify(item)}>{item.nombre}</option>
        });
    }

    const mapCiudades = (ciudades: Ciudad[]) => {
        return ciudades.map((item: Ciudad) => {
            return <option key={item.id}
                           value={JSON.stringify(item)}>{item.nombre}</option>
        });
    }

    const defaultParams = () => {
        setEstado(false);
        setTitle(home("title_modal_pais"));
        setSubtitle(home("subtitle_modal_pais"));
        setButton(home("title_modal_button_pais"));
        setBtnEstado(false);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        if (props.opcional) {
            defaultParams();
            props.exit();
        }
    });

    useEffect(() => {
        listaPaisesQuery().then(r => null);
        defaultParams();
    }, []);

    return (props.estado ? <Fragment>
        {/* @ts-ignore */}
        <section style={style} className="min-h-screen flex items-center justify-center shadow-md">
            <div ref={wrapperRef} className="w-full mx-4 p-4 rounded md:w-1/2 lg:w-1/4 bg-gray-900">
                <div>
                    <div className="flex items-center justify-center">
                        <TiLocation className="w-10 h-10 text-gray-700 dark:text-gray-300"/>
                    </div>
                </div>
                <div className="mt-1">
                    <h1 className="text-lg font-bold text-white text-center">{title}</h1>
                </div>
                <div className="mx-2 my-1">
                    <h2 className="text-base text-gray-200">{subtitle}</h2>
                    <div className=" my-4 text-center m-1">
                        {/* @ts-ignore */}
                        <select ref={select}
                                className="bg-blue-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-indigo-500 w-full"
                                onChange={e => eventChange(e)}>
                            <option value={""} disabled selected>{common("select_index")}</option>
                            {estado ? mapCiudades(ciudades) : mapPaises(paises)}
                        </select>
                    </div>

                    <div className="text-center">
                        <button onClick={estado ? nextCiudad : nextPais} disabled={!btnEstado}
                                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 md:w-2/5 w-full">
                            {button}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </Fragment> : <Fragment/>)
}
export default SelectParametros;