import {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";

const PortadaCategoria = () => {
    const comidasTranslation: any = useTranslation(namespaces.pages.comidas).t;
    return (
        <Fragment>
            <section className="text-gray-600 body-font">
                <div className="container px-5 lg:pt-12 pb-8 mx-auto flex flex-wrap flex-col">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="text-xl font-medium title-font mb-4 text-gray-900">{comidasTranslation("description_1")}</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            {comidasTranslation("description_2")}</p>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default PortadaCategoria;