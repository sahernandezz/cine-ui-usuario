import React, {useEffect, useState} from "react";
import {Funcion} from "../../model/Funcion";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";
import {Silla} from "../../model/Silla";
import MenuCompra from "../../components/menu_compra/MenuCompra";
import {LocalidadCompra} from "../../model/localidadCompra";
import {useNavigate} from "react-router-dom";
import {alphabetIndex} from "../../element/alphabet";
import ItemSilla from "./IntemSilla";
import {listaFuncionesPelicula, sillasPorFuncion} from "../../service/FuncionServiceImpl";
import {FuncionSalaSilla} from "../../model/FuncionSalaSilla";
import {cerrarSesion} from "../../element/user";

const UbicacionCompra = () => {
    const menuTranslation: any = useTranslation(namespaces.pages.compra).t;

    const funcion: Funcion = JSON.parse(window.sessionStorage.getItem("funcion_compra") || "{}");
    const localidad: LocalidadCompra = JSON.parse(window.sessionStorage.getItem("localidad_data") || "{}");

    const [sillas, setSillas] = useState<Silla[]>([]);
    const [selectSillas, setSelectSillas] = useState<Silla[]>([]);
    const [estado, setEstado] = useState<boolean>(false);
    const [cont, setCont] = useState<number>(0);

    const navigate = useNavigate();

    const sillaNew = (key: number, fila: number, columna: number, estado: boolean, tipo: string): Silla => {
        const silla: Silla = {
            id: key,
            fila: fila,
            columna: columna,
            tipo: tipo,
            estado: !estado,
            select: false,
        }
        return silla
    }

    const buscarSilla = (fila: number, columna: number, sillas: FuncionSalaSilla[]) => {
        let estado: FuncionSalaSilla | null = null;
        sillas.map((item: FuncionSalaSilla) => {
            if (Number.parseInt(String(item.fila)) === fila && Number.parseInt(String(item.columna)) === columna) {
                estado = item;
            }
        });

        return estado;
    }

    const sillasList = (sillasOcupadas: FuncionSalaSilla[]) => {
        let sillasAux: Silla[] = [];
        let aux: number = 0;
        for (let j = 0; j < funcion.multiplexSala.numeroColumnas; j++) {
            for (let i = 0; i < funcion.multiplexSala.numeroFilas; i++) {
                const silla: FuncionSalaSilla | null = buscarSilla(i, j, sillasOcupadas);
                if (silla === null) {
                    if (aux < funcion.multiplexSala.sillasGeneral) {
                        sillasAux.push(sillaNew(aux, i, j, localidad.tipoLocalidad === 'G', "G"));
                    } else {
                        sillasAux.push(sillaNew(aux, i, j, localidad.tipoLocalidad === 'P', "P"));
                    }
                } else {
                    // @ts-ignore
                    sillasAux.push(sillaNew(aux, i, j, false, silla.tipoSilla));
                }
                aux++;
            }
        }
        setSillas(sillasAux);
    }

    const updateSilla = (silla: Silla) => {
        const sillasSelectAux: Silla[] = selectSillas;
        sillas.map((sillaAux: Silla) => {
            if (sillaAux.id === silla.id) {
                if (sillaAux.select) {
                    sillasSelectAux.push(sillaAux);
                } else {
                    sillasSelectAux.splice(sillasSelectAux.indexOf(sillaAux), 1);
                }
            }
        });

        if (selectSillas.length + 1 > localidad.cantidad) {
            setEstado(true);
        } else {
            setEstado(false);
        }

        setCont(sillasSelectAux.length);
        setSelectSillas(sillasSelectAux);
    }

    const mapSillas = (sillas: Silla[]) => {
        const list: any[] = [];
        let estadoGeneral: boolean = false;
        for (let i = 0; i < sillas.length; i++) {

            if (!estadoGeneral) {
                if (sillas[i].tipo === "P") {
                    estadoGeneral = true;
                    for (let j = 0; j < funcion.multiplexSala.numeroFilas * 2; j++) {
                        list.push(<span className="text-lg text-gray-500"/>);
                    }
                }
            }

            list.push(<ItemSilla silla={sillas[i]} add={updateSilla} key={sillas[i].id} estado={estado}/>);
        }
        return list;
    }

    const next = () => {
        if (localidad.cantidad === selectSillas.length) {
            window.sessionStorage.setItem("ubicacion_compra", JSON.stringify({
                sillas: selectSillas,
            }));
            navigate("/compra/pago");
        }
    }

    const listaSillasQuery = async () => {
        await sillasPorFuncion(funcion).then((response: any) => {
            const lista: FuncionSalaSilla[] = response.data;
            sillasList(lista);
        }).catch((error: any) => {
            if (error.response.status === 401) {
                cerrarSesion();
            }
        });
    }

    useEffect(() => {
        if (localidad === null) {
            navigate("/compra/localidad");
        } else {
            listaSillasQuery().then(() => null);
        }
    }, []);

    return (
        <div className="md:w-10/12 w-full">
            <div className="text-center md:m-8 bg-white md:p-8 p-4 rounded shadow-lg">
                <h1 className="text-xl">{menuTranslation('ubicacion.sub_title')}</h1>
                <div className="pt-8 mx-auto text-center">
                    <div className="w-full">
                        <div className="flex border-t border-b border-gray-200 py-2 text-lg">
                            <span className="text-gray-500">{menuTranslation('ubicacion.numero_sillas')}:</span>
                            <span className="ml-auto text-gray-900">{cont}/{localidad.cantidad}</span>
                        </div>
                        <div className="w-2/4 bg-gray-900 text-white mx-auto mt-4 rounded-lg h-6">
                            <span className="text-md">{menuTranslation('ubicacion.pantalla')}</span>
                        </div>
                        <div className="mx-auto md:p-8 p-2 pt-8 overflow-x-auto md:w-1/2"
                             style={{
                                 display: "grid",
                                 gridTemplateColumns: `repeat(${(funcion.multiplexSala.numeroFilas).toString()}, 1fr)`,
                                 gridTemplateRows: `repeat(${(funcion.multiplexSala.numeroColumnas).toString()}, 1fr)`,
                                 gridGap: "4px",
                                 overflow: "auto"
                             }}>
                            {mapSillas(sillas)}
                        </div>
                    </div>
                </div>
                <div className="flex md:justify-center my-10 overflow-x-auto w-full">
                    <div className="flex mx-2">
                        <label style={{
                            backgroundColor: "rgb(28,101,204)",
                            width: "32px",
                            border: "1px solid rgb(210,210,211)",
                            height: "32px",
                            borderRadius: "50%"
                        }}/>
                        <span
                            className="mx-2 text-gray-500 text-md">{menuTranslation('ubicacion.items.lugares_no_disponibles')}</span>
                    </div>
                    <div className="flex mx-2">
                        <label style={{
                            backgroundColor: "rgb(28,204,131)",
                            width: "32px",
                            border: "1px solid rgb(210,210,211)",
                            height: "32px",
                            borderRadius: "50%"
                        }}/>
                        <span
                            className="mx-2 text-gray-500 text-md">{menuTranslation('ubicacion.items.tus_sillas')}</span>
                    </div>
                    <div className="flex mx-2">
                        <label style={{
                            backgroundColor: "rgb(210,210,211)",
                            width: "32px",
                            border: "1px solid rgb(210,210,211)",
                            height: "32px",
                            borderRadius: "50%"
                        }}/>
                        <span
                            className="mx-2 text-gray-500 text-md">{menuTranslation('ubicacion.items.sillas_disponibles')}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={next}
                            disabled={localidad.cantidad !== selectSillas.length}
                            className="disabled:opacity-50 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        {menuTranslation('ubicacion.btn_continuar')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UbicacionCompra;