import http from "./conf";

import {Auth} from "../model/Auth";

/**
 * @description login user
 * @param auth
 */
export const userLogin = async (auth: Auth) => {
    return http.post(`/auth/api/v1/login`, auth);
}
