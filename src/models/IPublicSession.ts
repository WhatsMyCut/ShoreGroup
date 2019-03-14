import { IServiceUser } from "../models/IServiceUser";

/**
 * Isomorphic application session data.
 */
export interface IPublicSession {
    serviceUser?: IServiceUser;
}