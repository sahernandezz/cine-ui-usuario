import React, {Fragment} from "react";
import ReactPlayer from "react-player";
import {Pelicula} from "../../../model/Pelicula";
import {useTranslation} from "react-i18next";
import {namespaces} from "../../../i18n/i18n.constants";

const TrailerVisualizar = (props: { pelicula: Pelicula }) => {
    const peliculasPage: any = useTranslation(namespaces.pages.peliculas).t;

    return (
        <Fragment>
            <div className="pt-16">
                <h2 className="pb-4 text-2xl text-gray-900 font-bold md:text-4xl">{peliculasPage("trailer")}</h2>
                <div className="h-full w-full">
                    <ReactPlayer
                        url={props.pelicula.tailer}
                        width={"100%"}
                        height={400}
                        controls
                        style={{borderRadius: "10px", boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)"}}
                        muted
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default TrailerVisualizar;