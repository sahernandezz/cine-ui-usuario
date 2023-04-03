import {useEffect} from "react";

export const useOutsideAlerter = (ref: any, eventFunction: Function) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                eventFunction();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};