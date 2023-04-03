/**
 * fecha en formato yyyy-mm-dd
 * @param date
 */
export const formatDateSimpleFormat = (date: Date) => {
    const d: Date = new Date(date);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/').toString();
}
/**
 * fecha en formato dd/mm/yyyy/hh/mm/ss
 * @param date
 */
export const formatDate = (date: Date) => {
    const d: Date = new Date(date);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' +
        [d.getHours(), d.getMinutes()].join(':');
}

/**
 * fecha en formato hh/mm/ss
 * @param date
 */
export const formatHours= (date: Date) => {
    const d: Date = new Date(date);
    return ' ' + [d.getHours(), d.getMinutes()].join(':');
}
