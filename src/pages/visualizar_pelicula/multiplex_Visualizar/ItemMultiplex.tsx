import React, {useEffect, useState} from "react";
import {Funcion} from "../../../model/Funcion";
import {MultiplexFuncion} from "../../../model/MultiplexFuncion";
import {TipoSala} from "../../../model/TipoSala";
import {SalaTipoIdioma} from "../../../model/SalaTipoIdioma";
import SubItemMultiplex from "./SubItemMultiplex";

export interface FuncionTipoSala {
    tipoSala: TipoSala;
    salaTipoIdioma: SalaTipoIdioma;
    funciones: Funcion[];
}

const ItemMultiplex = (props: { multiplexFunciones: MultiplexFuncion }) => {

    const [funciones, setFunciones] = useState<FuncionTipoSala[]>([]);

    const funcionesPorSala = (funciones: Funcion[]) => {
        const lista: FuncionTipoSala[] = [];
        funciones.forEach((funcion: Funcion) => {
            const tipoSala = funcion.multiplexSala.tipoSala;
            const salaTipoIdioma = funcion.multiplexTarifa.salaIdioma;

            if (!isExistTipoSala(tipoSala, salaTipoIdioma, lista)) {
                const listaFunciones: Funcion[] = funciones.filter((funcion: Funcion) => {
                    return funcion.multiplexSala.tipoSala.id === tipoSala.id && funcion.multiplexTarifa.salaIdioma.id === salaTipoIdioma.id;
                });

                if (listaFunciones) {
                    listaFunciones.sort((a: Funcion, b: Funcion) => {
                        const d1: Date = new Date(a.fechaInicio);
                        const d2: Date = new Date(b.fechaInicio);
                        return d1.getDate(), d1.getMonth(), d1.getHours(), d1.getMinutes() - d2.getDate(), d2.getMonth(), d2.getHours(), d2.getMinutes()
                    });

                    lista.push({tipoSala: tipoSala, salaTipoIdioma: salaTipoIdioma, funciones: listaFunciones});
                }
            }
        });

        return lista;
    }

    const isExistTipoSala = (tipoSala: TipoSala, salaTipoIdioma: SalaTipoIdioma, funcionTipoSala: FuncionTipoSala[]) => {
        let isExist = false;
        funcionTipoSala.forEach((item: FuncionTipoSala) => {
            if (item.tipoSala.id === tipoSala.id && item.salaTipoIdioma.id === salaTipoIdioma.id) {
                isExist = true;
            }
        });
        return isExist;
    }

    useEffect(() => {
        setFunciones(funcionesPorSala(props.multiplexFunciones.funciones));
    }, []);

    return (
        <div className="flex flex-wrap p-2 m-3 bg-gray-200 rounded border">
            <div className="md:w-20 md:mb-0 flex-shrink-0 flex flex-col">
                <span
                    className="title-font text-lg font-medium text-gray-600 mb-3">{props.multiplexFunciones.multiplex.nombre}</span>
            </div>
            <ul className="">
                {
                    funciones.map((funcionTipoSala: FuncionTipoSala, index: number) => {
                        return (
                            <li className="text-2xl" key={index}>
                                <div className="h-full overflow-hidden">
                                    <div className="p-6">
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{funcionTipoSala.tipoSala.nombre} {funcionTipoSala.salaTipoIdioma.nombre}</h1>
                                        <div className="flex items-center flex-wrap overflow-x-auto w-full">
                                            <SubItemMultiplex funciones={funcionTipoSala.funciones}/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ItemMultiplex;