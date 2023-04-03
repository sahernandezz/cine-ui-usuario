import React from "react";
import Estrella from "./Estrella";

const Estrellas = (props: { valoracion: number }) => {

    const estrellas = (valoracion: number): any[] => {
        const estrellas: any[] = [];

        for (let i = 1; i <= 5; i++) {
            if (valoracion >= i) {
                estrellas.push(<Estrella key={i - 1} estado={true}/>);
            } else {
                estrellas.push(<Estrella key={i - 1} estado={false}/>);
            }
        }
        return estrellas;
    }

    return (
        <section className="flex items-center">
            {estrellas(Number.parseInt(String(props.valoracion)))}
        </section>
    )
}

export default Estrellas;