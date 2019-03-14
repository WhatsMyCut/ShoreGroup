import { IPublicSession } from "../models/IPublicSession";
import { IPrivateSession } from "../models/IPrivateSession";

/**
 * Represents the isomorphic session.
 */
export interface INodeSession {
    public?: IPublicSession;
    private?: IPrivateSession;
}