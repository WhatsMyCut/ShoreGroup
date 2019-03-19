/**
 * Account Service - API
 * 
 * @author Matthew Dunham <matthew.d@shoregrp.com>
 */

import { ILoginModel } from "../models/ILoginModel";
import { IServiceUser } from "../models/IServiceUser";
import Result from "../models/Result";
import { ServiceBase } from "./ServiceBase";
import Globals from "../Globals";

/**
 * Account Service - API
 * 
 * This class handles the API communication related
 * to authentication of users via an ActiveDirectory
 * proxy.
 */
export default class AccountService extends ServiceBase {

  /**
   * Issue a login request
   * 
   * @param loginModel
   */
  static async login(loginModel: ILoginModel): Promise<Result<IServiceUser>> {
    // TODO: Tie this into the API and remove this mock data
    var result = { "hasErrors": false, "value": { "login": loginModel.login }, "errors": [] };

    // await this.requestJson<IServiceUser>({
    //    url: "api/Account/Login",
    //    method: "POST",
    //    data: loginModel
    // });

    if (!result.hasErrors) {
      Globals.serviceUser = result.value;
    }

    window.localStorage.setItem('publicSession', JSON.stringify({
      "serviceUser": result.value
    }));

    return result;
  }

  /**
   * Issue the logout request
   */
  static async logout(): Promise<Result<{}>> {
    var result = { "hasErrors": false, "errors": [], "value": "" };
    // await this.requestJson<IServiceUser>({
    //    url: "api/Account/Logout",
    //    method: "POST"
    // });

    if (!result.hasErrors) {
      Globals.serviceUser = <IServiceUser>{};
    }

    window.localStorage.setItem('publicSession', JSON.stringify({
      "serviceUser": null
    }));

    return result;
  }
}