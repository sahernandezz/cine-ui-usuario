import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../i18n/i18n.constants";

const Error404 = () => {
    const common: any = useTranslation(namespaces.common).t;
    return (
        <Fragment>
            <div className="">
                <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-800">
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                        {common("error404_title")}
                    </div>
                    <button className="mt-5">
                        <Link to={'/'}
                              className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                            <span
                                className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                               {common("error404_btn")}
                            </span>
                        </Link>
                    </button>
                </main>
            </div>
        </Fragment>
    )
}
export default Error404;