import React, {useState} from "react";
import {FacturaFuncion} from "../../../model/FacturaFuncion";
import ItemPelicula from "./ItemPelicula";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";
import {FacturaComida} from "../../../model/FacturaComida";
import ItemAlimento from "./ItemAlimento";
import {Factura} from "../../../model/Factura";
import Modal from "../../../components/modal/Modal";

const TablaCompras = (props: { facturasFuncion: FacturaFuncion[], facturasAlimentos: FacturaComida[] }) => {

    const perfilTranslation: any = useTranslation(namespaces.pages.perfil).t;
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [componenteModal, setComponentModal] = useState<any>(null);

    // @ts-ignore
    const lista: Factura[] = props.facturasFuncion.concat(props.facturasAlimentos).sort((a, b) => a.fecha < b.fecha ? 1 : -1);

    return (
        <div className="p-6 bg-white rounded">
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead
                        className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('film')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('type')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('date')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('place')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('screen_type')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">pt</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('worth')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('tax_rate')}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{perfilTranslation('movie_rating')}</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {lista.map((item, index) => {
                        // @ts-ignore
                        if (item["funcion"] !== undefined) {
                            {/* @ts-ignore*/}
                            return <ItemPelicula key={item.id} factura={item} modal={setEstadoModal}
                                                 component={setComponentModal}/>
                        } else {
                            {/* @ts-ignore*/}
                            return <ItemAlimento key={item.id} factuta={item}/>
                        }
                    })}
                    </tbody>
                </table>
            </div>
            <Modal estado={estadoModal} exit={() => setEstadoModal(false)} opcional={true} component={componenteModal}/>
        </div>
    )
}
export default TablaCompras;