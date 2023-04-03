import {i18n} from "../i18n/i18n";
import {languages} from "../i18n/i18n.constants";
import {Parametros} from "../model/Parametros";

const asignarIdioma = (idioma: string): void => {
    i18n.changeLanguage(idioma).then(r => null);
}

const validarIdioma = (idioma: string): string => {
    let idiomaVerificado: string = '';
    // @ts-ignore
    if (languages[idioma] !== undefined) {
        idiomaVerificado = idioma;
    } else {
        idiomaVerificado = i18n.language;
    }
    return idiomaVerificado;
}

export const establecerIdioma = (idioma: string): void => {
    let params: Parametros = JSON.parse(window.localStorage.getItem('params') || '{}');
    if (params.idioma !== idioma.toLowerCase() || i18n.language !== idioma.toLowerCase()) {
        asignarIdioma(validarIdioma(idioma.toLowerCase()));
        params.idioma = i18n.language;
        window.localStorage.setItem('params', JSON.stringify(params));
    }
}